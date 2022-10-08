import * as dotenv from 'dotenv';
import express, {
  Express,
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import { ConsumeMessage } from 'amqplib';
import { QueuesNames, QueuesNamesList } from './src/constants/queue-names';
import RabbitMQ from './src/services/rabbitmq';
import rent from './src/routes/rent';
import HttpError from './src/models/http-error';
import { RentInterface } from './src/models/rent';
import { createRent } from './src/controllers/rents';
dotenv.config();

const app: Express = express();
const port: number = Number(process.env.PORT) ?? 3000;

function initConsumeMessagesRabbitMQ(tempRabbitMQ: RabbitMQ): void {
  tempRabbitMQ.consumeMessages(
    QueuesNames.createRent,
    (message: ConsumeMessage | null) => {
      if (message != null) {
        const rent: RentInterface = JSON.parse(message.content.toString());
        void createRent(rent);
      }
    }
  );
}

const rabbitMQ: RabbitMQ = new RabbitMQ(
  QueuesNamesList,
  initConsumeMessagesRabbitMQ
);

app.use(cors());

app.use(helmet());

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
  } else {
    next();
  }
});

app.use('/rent', rent);

app.use((req: Request, res: Response) => {
  throw new HttpError('Could not find this route.', 404);
});

app.use(((error, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(error?.code ?? 500);
  res.json({ message: error?.message ?? 'An unknown error occurred!' });
}) as ErrorRequestHandler);

mongoose
  .connect(`${process.env.MONGODB_CONNECTION ?? ''}`)
  .then(() => {
    app.listen(port, () => {
      console.log(`Rent API listening on port ${port}`);
      rabbitMQ.init(1).catch(() => console.log('error!'));
      process.on('exit', (code) => {
        rabbitMQ.close();
      });
    });
  })
  .catch((err) => {
    console.log(err);
  });

process.on('SIGINT', () => {
  process.exit(1);
});

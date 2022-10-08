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
import { QueuesNamesList } from './src/constants/queue-names';
import RabbitMQ from './src/services/rabbitmq';
import bikes from './src/routes/bikes';
import rent from './src/routes/rent';
import HttpError from './src/models/http-error';
dotenv.config();

const app: Express = express();
const port: number = Number(process.env.PORT) ?? 3000;
const rmqProducer = new RabbitMQ(QueuesNamesList);

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

app.use(async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.RMQProducer = rmqProducer;
    next();
  } catch (error) {
    return next(new HttpError('Could not init RMQProducer.', 500));
  }
});

app.use('/bikes', bikes);
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

app.listen(port, () => {
  console.log(`Services API listening on port ${port}`);
  void rmqProducer.init();
});

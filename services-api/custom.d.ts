import RabbitMQ from './src/services/rabbitmq';

declare global {
  namespace Express {
    export interface Request {
      RMQProducer?: RabbitMQ;
    }
  }
}

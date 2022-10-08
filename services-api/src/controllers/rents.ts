import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationError, Result } from 'express-validator';
import { QueuesNames } from '../constants/queue-names';
import HttpError from '../models/http-error';
import { RentInterface } from '../models/rent';

export const rentBike = async (
  req: Request<Result<ValidationError>, unknown, RentInterface>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const createdRent = {
    ...req.body,
  };

  try {
    req.RMQProducer?.sendMessage(
      QueuesNames.createRent,
      JSON.stringify(createdRent)
    );
  } catch (err) {
    return next(
      new HttpError('Something went wrong, could not update bike.', 500)
    );
  }
  res.status(200).json({ rent: createdRent });
};

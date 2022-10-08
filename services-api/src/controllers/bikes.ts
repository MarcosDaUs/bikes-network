import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationError, Result } from 'express-validator';
import { v4 as uuidv4 } from 'uuid';
import { QueuesNames } from '../constants/queue-names';
import HttpError from '../models/http-error';
import { CreateBikeInterface } from '../models/bike';

export const createBike = (
  req: Request<Result<ValidationError>, unknown, CreateBikeInterface>,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { color, model, longitude, latitude }: CreateBikeInterface = req.body;
  const id: string = uuidv4();

  const createdBike = {
    color,
    model,
    bikeId: id,
  };

  const createdLocation = {
    longitude,
    latitude,
    bikeId: id,
  };

  try {
    req.RMQProducer?.sendMessage(
      QueuesNames.createBike,
      JSON.stringify(createdBike)
    );
    req.RMQProducer?.sendMessage(
      QueuesNames.createLocation,
      JSON.stringify(createdLocation)
    );
  } catch (err) {
    return next(new HttpError('Creating bike failed, please try again.', 500));
  }
  res.status(201).json({ bike: { ...createdBike, ...createdLocation } });
};

export const updateBike = async (
  req: Request<{ bid: string }, unknown, CreateBikeInterface>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { color, model, longitude, latitude }: CreateBikeInterface = req.body;
  const bikeId: string = req.params.bid;

  const createdBike = {
    color,
    model,
    bikeId,
  };

  const createdLocation = {
    longitude,
    latitude,
    bikeId,
  };

  try {
    req.RMQProducer?.sendMessage(
      QueuesNames.updateBike,
      JSON.stringify(createdBike)
    );
    req.RMQProducer?.sendMessage(
      QueuesNames.updateLocation,
      JSON.stringify(createdLocation)
    );
  } catch (err) {
    return next(
      new HttpError('Something went wrong, could not update bike.', 500)
    );
  }
  res.status(200).json({ bike: { ...createdBike, ...createdLocation } });
};

export const deleteBike = (
  req: Request<{ bid: string }>,
  res: Response,
  next: NextFunction
): void => {
  void (async function (): Promise<void> {
    const bikeId: string = req.params.bid;

    try {
      req.RMQProducer?.sendMessage(QueuesNames.deleteBike, bikeId);
      req.RMQProducer?.sendMessage(QueuesNames.deleteLocation, bikeId);
    } catch (err) {
      return next(
        new HttpError('Something went wrong, could not delete bike.', 500)
      );
    }

    res.status(200).json({ message: 'Deleted bike.' });
  })();
};

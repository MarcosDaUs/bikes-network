import { Request, Response, NextFunction } from 'express';
import { Document, Types } from 'mongoose';
import { validationResult, ValidationError, Result } from 'express-validator';
import HttpError from '../models/http-error';
import Rent, { RentInterface } from '../models/rent';

export const createRent = async (
  rent?: RentInterface | null
): Promise<
  Document<unknown, unknown, RentInterface> &
    RentInterface & {
      _id: Types.ObjectId;
    }
> => {
  if (rent != null) {
    const { userId, bikeId, startDate, endDate }: RentInterface = rent;

    const tempRent = new Rent({ userId, bikeId, startDate, endDate });

    return await tempRent.save().then(
      async (createdRent) => {
        return await Promise.resolve(createdRent);
      },
      async () => {
        return await Promise.reject(
          new HttpError('Creating rent failed, please try again.', 500)
        );
      }
    );
  } else {
    return await Promise.reject(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }
};

export const createRentRoute = (
  req: Request<Result<ValidationError>, unknown, RentInterface>,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  createRent(req.body).then(
    (createdRent) => {
      res.status(201).json({ rent: createdRent });
    },
    (error) => {
      return next(error);
    }
  );
};

export const getRentsByBikeId = (
  req: Request<{ bid: string }>,
  res: Response,
  next: NextFunction
): void => {
  const bikeId: string = req.params.bid;
  Rent.find({ bikeId }).then(
    async (rents) => {
      if (rents == null || rents.length === 0) {
        return next(
          new HttpError('Could not find rents for the provided bike id.', 404)
        );
      }
      const currentDate: number = new Date().getTime();
      const currentRent: RentInterface | undefined = rents.find(
        (rent: RentInterface) =>
          currentDate >= new Date(rent.startDate).getTime() &&
          currentDate <= new Date(rent.endDate).getTime()
      );

      res.json({
        isRented: currentRent != null,
        rents: rents.map((rent) => rent.toObject({ getters: true })),
      });
    },
    async () => {
      const error = new HttpError(
        'Something went wrong, could not find rents for the provided bike id.',
        500
      );
      return next(error);
    }
  );
};

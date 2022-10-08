import { Request, Response, NextFunction } from 'express';
import { Document, Types } from 'mongoose';
import { validationResult, ValidationError, Result } from 'express-validator';
import HttpError from '../models/http-error';
import Location, {
  LocationInterface,
  CoordinatesInterface,
} from '../models/location';

export const getLocationByBikeId = (
  req: Request<{ bid: string }>,
  res: Response,
  next: NextFunction
): void => {
  const bikeId: string = req.params.bid;
  Location.findOne({ bikeId }).then(
    (location) => {
      if (location == null) {
        return next(
          new HttpError(
            'Could not find a location for the provided bike id.',
            404
          )
        );
      }
      res.json({ location: location.toObject({ getters: true }) });
    },
    () => {
      return next(
        new HttpError(
          'Something went wrong, could not find a location for the provided bike id.',
          500
        )
      );
    }
  );
};

export const createLocation = async (
  location?: LocationInterface | null
): Promise<
  Document<unknown, unknown, LocationInterface> &
    LocationInterface & {
      _id: Types.ObjectId;
    }
> => {
  if (location != null) {
    const { latitude, longitude, bikeId }: LocationInterface = location;

    const tempLocation = new Location({ latitude, longitude, bikeId });

    return await tempLocation.save().then(
      async (createdLocation) => {
        return await Promise.resolve(createdLocation);
      },
      async () => {
        return await Promise.reject(
          new HttpError('Creating location failed, please try again.', 500)
        );
      }
    );
  } else {
    return await Promise.reject(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }
};

export const createLocationRoute = (
  req: Request<Result<ValidationError>, unknown, LocationInterface>,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  createLocation(req.body).then(
    (createdLocation) => {
      res.status(201).json({ location: createdLocation });
    },
    (error) => {
      return next(error);
    }
  );
};

export const updateLocation = async (
  location?: LocationInterface | null
): Promise<
  Document<unknown, unknown, LocationInterface> &
    LocationInterface & {
      _id: Types.ObjectId;
    }
> => {
  if (location != null) {
    const { longitude, latitude, bikeId }: LocationInterface = location;
    return await Location.findOne({ bikeId }).then(
      async (tempLocation) => {
        if (tempLocation == null) {
          return await Promise.reject(
            new HttpError('Could not find location for this bike id.', 404)
          );
        }
        tempLocation.longitude = longitude;
        tempLocation.latitude = latitude;
        return await tempLocation.save().then(
          async (updatedLocation) => {
            return await Promise.resolve(updatedLocation);
          },
          async () => {
            return await Promise.reject(
              new HttpError(
                'Something went wrong, could not update location.',
                500
              )
            );
          }
        );
      },
      async () => {
        return await Promise.reject(
          new HttpError('Something went wrong, could not update location.', 500)
        );
      }
    );
  } else {
    return await Promise.reject(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }
};

export const updateLocationRoute = (
  req: Request<{ bid: string }, unknown, CoordinatesInterface>,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const location: LocationInterface = {
    ...req.body,
    bikeId: req.params.bid,
  };

  updateLocation(location).then(
    (updatedLocation) => {
      res
        .status(200)
        .json({ location: updatedLocation.toObject({ getters: true }) });
    },
    (error) => {
      return next(error);
    }
  );
};

export const deleteLocation = async (
  bikeId?: string | null
): Promise<
  Document<unknown, unknown, LocationInterface> &
    LocationInterface & {
      _id: Types.ObjectId;
    }
> => {
  if (bikeId != null) {
    return await Location.findOne({ bikeId }).then(
      async (tempLocation) => {
        if (tempLocation == null) {
          return await Promise.reject(
            new HttpError('Could not find location for this bike id.', 404)
          );
        }
        return await tempLocation.remove().then(
          async (deletedLocation) => {
            return await Promise.resolve(deletedLocation);
          },
          async () => {
            return await Promise.reject(
              new HttpError(
                'Something went wrong, could not delete location.',
                500
              )
            );
          }
        );
      },
      async () => {
        return await Promise.reject(
          new HttpError('Something went wrong, could not delete location.', 500)
        );
      }
    );
  } else {
    return await Promise.reject(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }
};

export const deleteLocationRoute = (
  req: Request<{ bid: string }>,
  res: Response,
  next: NextFunction
): void => {
  const bikeId: string = req.params.bid;
  deleteLocation(bikeId).then(
    () => {
      res.status(200).json({ message: 'Deleted location.' });
    },
    (error) => {
      return next(error);
    }
  );
};

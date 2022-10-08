import { Schema, model } from 'mongoose';

export interface CoordinatesInterface {
  longitude: number;
  latitude: number;
}

export interface LocationInterface extends CoordinatesInterface {
  bikeId: string;
}

const locationSchema = new Schema<LocationInterface>({
  longitude: { type: Number, required: true },
  latitude: { type: Number, required: true },
  bikeId: { type: String, required: true },
});

const Location = model<LocationInterface>('Location', locationSchema);

export default Location;

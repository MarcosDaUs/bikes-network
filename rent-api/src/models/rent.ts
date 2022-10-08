import { Schema, model } from 'mongoose';

export interface RentInterface {
  userId: string;
  bikeId: string;
  startDate: Date;
  endDate: Date;
}

const rentSchema = new Schema<RentInterface>({
  userId: { type: String, required: true },
  bikeId: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

const Rent = model<RentInterface>('Rent', rentSchema);

export default Rent;

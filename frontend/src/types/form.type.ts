import { ChangeEvent } from 'react';
import { Bike } from './bike.type';
import { Location } from './location.type';
import { Rent } from './rent.type';

export type InputType = 'text' | 'number' | 'datetime-local';

export interface InputsEventsHandler {
  value: string | number;
  type?: InputType;
  name?: string;
  event?: ChangeEvent<HTMLInputElement>;
}

export interface BikeFormData extends Bike, Location {}

export interface RentFormData extends Rent {}

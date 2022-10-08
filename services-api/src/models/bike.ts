import { LocationInterface } from './location';

export interface BikeInterface {
  color: string;
  model: string;
}

export interface CreateBikeInterface extends BikeInterface, LocationInterface {}

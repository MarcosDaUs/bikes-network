export interface Rent {
  userId: string;
  bikeId: string;
  startDate: Date;
  endDate: Date;
}

export interface GetBikeRentsResponse {
  isRented: boolean;
  rents: Rent[];
}

export interface PostCreateBikeRentResponse {
  rent: Rent;
}

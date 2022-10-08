export interface Bike {
  bikeId: string;
  color: string;
  id: string;
  model: string;
}

export interface GetAllBikesResponse {
  bikes: Bike[];
}

export interface PostCreateBikeResponse {
  bike: Bike;
}

export interface DeleteBikeResponse {
  message: string;
}

export interface UpdateBikeResponse {
  bike: Bike;
}

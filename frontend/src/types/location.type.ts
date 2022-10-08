export interface Location {
  bikeId: string;
  longitude: number;
  latitude: number;
}

export interface GetBikeLocationResponse {
  location: Location;
}

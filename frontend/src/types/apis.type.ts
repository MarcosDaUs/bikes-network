export interface EndPointsData {
  [prop: string]: string | (<T>(data: T) => string);
}

export interface ApiData {
  api: string;
  endPoints: EndPointsData;
}

export interface DbObject {
  _id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ApiRequestPayload {
  url: string;
  method: string;
  data?: object;
  onSuccess: string;
  onError?: string;
  onStart?: string;
}

export interface PriceFilterItem {
  _id: number;
  name: string;
  array: Array<number>;
}

export interface User {
  _id?: string;
  email: string;
  password: string;
  rol: string;
  lat: number;
  lon: number;
  payment_source_id: number;
}

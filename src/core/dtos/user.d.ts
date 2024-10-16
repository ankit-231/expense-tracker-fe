export interface UserMe {
  id: number;
  username: string;
  currency: string;
}

export type UserDetail = {
  id: number;
  username: string;
  currency: string;
};

export type UserMe = {
  id: number;
  username: string;
  password: string;
  role: string;
  name: string;
  department: number;
  email: string;
  phone: number;
  address: string;
  counter: null | number;
};

export type UserPayload = {
  id?: null | number;
  username: string;
  password: string;
  role: string;
  name: string;
  department: number;
  email: string;
  phone: number;
  address: string;
  counter: null | number;
};

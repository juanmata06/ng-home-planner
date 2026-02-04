export type UserRole = 'Admin' | 'User';

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegister {
  name: string;
  email: string;
  password: string;
  userRole?: UserRole;
}

export interface User {
  id: string;
  name: string;
  email: string;
  imgUrl?: string;
  userRole?: UserRole;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface FakeAPIUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Geo {
  lat: string;
  lng: string;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

import { BaseModel } from '../types';

export type UserModel = BaseModel & {
  name: string;
  email: string;
  password: string;
  birthDay: Date;
  imageURL?: string | null;
};

export type UserProps = {
  name: string;
  email: string;
  password: string;
  birthDay: Date;
  imageURL?: string | null;
};

export type UserWithoutPasswordModel = Omit<UserModel, 'password'>;

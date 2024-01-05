export type UserModel = {
  id: string;
  name: string;
  email: string;
  password: string;
  birthDay: Date;
  imageURL?: string;
};

export type UserWithoutPasswordModel = Omit<UserModel, 'password'>;

export type UserModel = {
  id: string;
  name: string;
  email: string;
  password: string;
  birthDay: Date;
  imageURL?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type UserWithoutPasswordModel = Omit<UserModel, 'password'>;

export interface UserProps {
  id: string;
  name: string;
  email: string;
  birthDay: Date;
  imageURL?: string | null;
  password: string;
}

export class User {
  constructor(public readonly props: UserProps) {}
}

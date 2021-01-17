export class User {
  login!: string;
  password!: string;
  name!: string;
  surname!: string;
  description!: string;
  tokens!: [
    {
      type: string;
      required: boolean;
    }
  ];
  avatar!: Buffer;
}
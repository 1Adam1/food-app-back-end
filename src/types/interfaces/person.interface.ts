import { Gender } from "../enums/gender.enum";

export interface Person {
  name: string;
  surname: string;
  dateOfBirth: Date;
  gender: Gender;
  description: string;
  avatar: Buffer;
}
import { Gender } from "../enums/gender.enum";
import { PersonalProfile } from "./personal-profile.interface";

export interface Person {
  name: string;
  surname: string;
  dateOfBirth: Date;
  gender: Gender;
  description: string;
  profiles: PersonalProfile[];
}
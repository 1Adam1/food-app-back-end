import { Token } from "./token";

export interface UserData {
  login: string;
  password: string;
  name: string;
  surname: string;
  description: string;
  tokens: Token[];
}
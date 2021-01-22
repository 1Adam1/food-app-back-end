import { Document, Model } from 'mongoose';
import { Token } from '../../types/interfaces/token';
import { UserData } from '../../types/interfaces/user-data.interface';

export interface UserDataModelInterface extends Document, UserData {
  generateToken(): Promise<Token>;
}

export interface UserDataModelIdexableInterface extends UserDataModelInterface {
  [key: string]: any;
}

export interface UserDataStaticModelInterface extends Model<UserDataModelInterface> {
  findByCredentials(login: string, password: string): Promise<UserDataModelInterface>;
}
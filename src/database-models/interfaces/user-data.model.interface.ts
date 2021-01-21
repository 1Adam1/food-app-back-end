import { Document } from 'mongoose';
import { UserData } from '../../types/interfaces/user-data.interface';

export interface UserDataModelInterface extends Document, UserData {
}
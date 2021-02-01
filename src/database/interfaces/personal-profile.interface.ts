import { Document } from 'mongoose';
import { PersonalProfile } from '../../types/interfaces/personal-profile.interface';

export interface PersonalProflieDataModelInterface extends Document, PersonalProfile {
}

export interface PersonalProfileDataModelIdexableInterface extends PersonalProflieDataModelInterface {
  [key: string]: any;
}
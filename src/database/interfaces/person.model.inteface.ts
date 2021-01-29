import { Document } from 'mongoose';
import { Person } from '../../types/interfaces/person.interface';
import { PersonalProflieDataModelInterface } from './personal-profile.interface';

export interface PersonDataModelInterface extends Document, Person {
  profiles?: PersonalProflieDataModelInterface[];
}

export interface PersonDataModelIdexableInterface extends PersonDataModelInterface {
  [key: string]: any;
}
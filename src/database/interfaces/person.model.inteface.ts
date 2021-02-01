import { Document } from 'mongoose';
import { Person } from '../../types/interfaces/person.interface';

export interface PersonDataModelInterface extends Document, Person {
}

export interface PersonDataModelIdexableInterface extends PersonDataModelInterface {
  [key: string]: any;
}
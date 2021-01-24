import { Document } from 'mongoose';
import { Meal } from '../../types/interfaces/meal.interface';

export interface MealDataModelInterface extends Document, Meal {
}

export interface MealDataModelIdexableInterface extends MealDataModelInterface {
  [key: string]: any;
}
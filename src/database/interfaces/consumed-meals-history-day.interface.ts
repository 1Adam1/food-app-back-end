import { Document } from 'mongoose';
import { ConsumedMealsHistoryDay } from '../../types/interfaces/consumed-meals-history-day.interface';

export interface ConsumedMealsHistoryDataModelInterface extends Document, ConsumedMealsHistoryDay {
}

export interface MealDataModelIdexableInterface extends ConsumedMealsHistoryDataModelInterface {
  [key: string]: any;
}
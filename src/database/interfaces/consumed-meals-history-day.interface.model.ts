import { Document } from 'mongoose';
import { ConsumedMealsHistoryDay } from '../../types/interfaces/consumed-meals-history-day.interface';

export interface ConsumedMealsHistoryDayDataModelInterface extends Document, ConsumedMealsHistoryDay {
}

export interface ConsumedMealsHistoryDayDataModelIndexableInterface extends ConsumedMealsHistoryDayDataModelInterface {
  [key: string]: any;
}
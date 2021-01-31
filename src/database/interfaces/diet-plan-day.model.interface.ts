import { Document } from 'mongoose';
import { DietPlanDay } from '../../types/interfaces/diet-plan-day.interface';

export interface DietPlanDayDataModelInterface extends Document, DietPlanDay {
}

export interface DietPlanDayDataModelIndexableInterface extends DietPlanDayDataModelInterface {
  [key: string]: any;
}
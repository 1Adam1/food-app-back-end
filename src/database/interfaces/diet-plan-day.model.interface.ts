import { Document } from 'mongoose';
import { DietPlanDay } from '../../types/interfaces/diet-plan-day.interface';

export interface DietPlanDayModelInterface extends Document, DietPlanDay {
}

export interface DietPlanDayModelIndexableInterface extends DietPlanDayModelInterface {
  [key: string]: any;
}
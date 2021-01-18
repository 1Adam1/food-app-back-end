import { MealTime } from './meal-time.interface';

export interface DietPlanDay {
  date: Date;
  description: string;
  mealTimes: MealTime[];
  totalKilocaloriesConsumption: number; 
}
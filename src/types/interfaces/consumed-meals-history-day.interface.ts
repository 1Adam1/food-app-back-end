import { MealTime } from './meal-time.interface';

export interface ConsumedMealsHistoryDay {
  date: Date; 
  mealTimes: MealTime[];
  totalKilocaloriesConsumption: number;
}
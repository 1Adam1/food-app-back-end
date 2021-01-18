import { MealPortion } from './meal-portion.interface';

export interface ConsumedMealsHistoryDay {
  date: Date; 
  mealPortions: MealPortion[];
  totalKilocaloriesConsumption: number;
  expectedKilocaloriesConsumption: number;
}
import { DietPlanDay } from "./diet-plan-day.interface";
import { Meal } from "./meal.interface";

export interface ConsumedMealsHistoryDay {
  date: Date; 
  meals: Meal[];
  totalKilocaloriesConsumption: number;
  expectedKilocaloriesConsumption: number;
}
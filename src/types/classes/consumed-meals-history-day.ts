import { DietPlanDay } from "./diet-plan-day";
import { Meal } from "./meal";

export class ConsumedMealsHistoryDay {
  date!: Date; 
  meals!: Meal[];
  totalKilocaloriesConsumption!: number;
  expectedKilocaloriesConsumption!: number;
}
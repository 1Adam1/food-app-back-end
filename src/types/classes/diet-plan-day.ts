import { MealTime } from "./meal-time";

export class DietPlanDay {
  date!: Date;
  description!: string;
  mealTimes!: MealTime[];
  totalKiloCalories!: number; 
}
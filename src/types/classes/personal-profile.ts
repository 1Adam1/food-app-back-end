import { ConsumedMealsHistoryDay } from "./consumed-meals-history-day";
import { DietPlanDay } from "./diet-plan-day";
import { Person } from "./person";

export class PersonalProfile {
  name!: string;
  person!: Person;
  description!: string;
  dailyKilocalorieIntake!: number;
  consumedMealsHistory!: ConsumedMealsHistoryDay[];
  dietPlan!: DietPlanDay[];
}
import { ConsumedMealsHistoryDay } from "./consumed-meals-history-day.interface";
import { DietPlanDay } from './diet-plan-day.interface';
import { Person } from './person.interface';

export interface PersonalProfile {
  name: string;
  person: Person;
  description: string;
  dailyKilocalorieIntake: number;
  consumedMealsHistory: ConsumedMealsHistoryDay[];
  dietPlan: DietPlanDay[];
}
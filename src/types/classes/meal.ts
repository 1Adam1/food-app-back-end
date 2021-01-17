import { Ingredient } from "./ingredient";
import { Recipe } from "./recipe";

export class Meal {
  name!: string;
  description!: string;
  ingredients!: Ingredient[];
  recipe!: Recipe;
  totalKilocalories!: number;
}
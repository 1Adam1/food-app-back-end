import { Ingredient } from "./ingredient.interface";
import { Recipe } from "./recipe.interface";

export interface Meal {
  name: string;
  description: string;
  ingredients: Ingredient[];
  recipe: Recipe;
  totalKilocalories: number;
}
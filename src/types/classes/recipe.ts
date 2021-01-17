import { RecipeDetails } from "./recipe-details";
import { RecipeStep } from "./recipe-step";

export class Recipe {
  steps!: RecipeStep[];
  details!: RecipeDetails;
}
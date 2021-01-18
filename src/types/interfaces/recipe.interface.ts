import { RecipeDetails } from "./recipe-details.interface";
import { RecipeStep } from "./recipe-step.interface";

export interface Recipe {
  steps: RecipeStep[];
  details: RecipeDetails;
}
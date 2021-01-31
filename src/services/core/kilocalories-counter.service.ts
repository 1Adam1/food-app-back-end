import Product from "../../database/models/product";
import { Ingredient } from "../../types/interfaces/ingredient.interface";
import { MealTime } from "../../types/interfaces/meal-time.interface";

export class KilocaloriesCounterService {
  static countForIngredients(ingredients: Ingredient[]) {
    let sum = 0;
    
    ingredients.forEach(ingredient => {
      sum += ingredient.size * ingredient.product.kilocaloriesPerUnit;
    });
    
    return sum;
  }

  static countForMealTimes(mealTimes: MealTime[]) {
    return 0;
  }
}
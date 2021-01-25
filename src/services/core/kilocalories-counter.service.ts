import Product from "../../database/models/product";
import { Ingredient } from "../../types/interfaces/ingredient.interface";

export class KilocaloriesCounterService {
  static count(ingredients: Ingredient[]) {
    let sum = 0;
    
    ingredients.forEach(ingredient => {
      sum += ingredient.size * ingredient.product.kilocaloriesPerUnit;
    });
    
    return sum;
  }
}
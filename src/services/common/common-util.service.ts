import { MealDataModelInterface } from "../../database/interfaces/meal.model.interface";
import { ProductDataModelInterface } from "../../database/interfaces/product.model.interface";
import { Ingredient } from "../../types/interfaces/ingredient.interface";
import { MealTime } from "../../types/interfaces/meal-time.interface";

export class CommonUtilService {
  static prepareDateMatchForPopulateOperation(
    fieldName: string, 
    dateFrom: string, 
    dateTo: string
  ): Object {
    if (!dateFrom && !dateTo) {
      return {};
    }
    
    const criteria: any = {};

    if (dateFrom) {
      criteria.$gt = dateFrom;
    }

    if (dateTo) {
      criteria.$lt = dateTo;
    }

    return {[fieldName]: criteria};
  }

  static extendMealTimesWithMealData(mealTimesWithMealsIds: MealTime[], meals: MealDataModelInterface[]): MealTime[] {
    for (let i = 0; i < mealTimesWithMealsIds.length; i++) {
      const mealId = mealTimesWithMealsIds[i].portion.meal;
      const meal = meals.find(meal => meal._id.toString() === mealId.toString());
      if (!meal) {
        throw new Error();
      }
  
      mealTimesWithMealsIds[i].portion.meal = meal;
    }
  
    return mealTimesWithMealsIds;
  }

  static extendIngrediensWithProductData(ingredientsWithProductsIds: Ingredient[], products: ProductDataModelInterface[]): Ingredient[] {
    for (let i = 0; i < ingredientsWithProductsIds.length; i++) {
      const productId = ingredientsWithProductsIds[i].product;
      const product = products.find(product => product._id.toString() === productId.toString());
      if (!product) {
        throw new Error();
      }
  
      ingredientsWithProductsIds[i].product = product;    
    }
  
    return ingredientsWithProductsIds;
  }
}
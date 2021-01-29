import { Response, NextFunction } from 'express';
import { ProductDataModelInterface } from '../../database/interfaces/product.model.interface';
import Meal from '../../database/models/meal';
import Product from '../../database/models/product';
import { ExtendedRequestType } from '../../database/types/extended-requests.type';

export class MealAuthorizationService {
  static async authorizateMeal(request: ExtendedRequestType, response: Response, next: NextFunction) {
    try {
      request = await MealAuthorizationService.extendRequestWithProperData(request);
      next();
    } catch (error) {
      response.status(404).send({error: 'Meal not found'});
    }
  }

  static async extendRequestWithProperData(request: ExtendedRequestType): Promise<ExtendedRequestType> {
    const mealId = request.params.mealId || request.query.mealId;
    
    if (!request.extendedData?.user || !mealId) {
      throw new Error();
    }

    const maintainer = request.extendedData.user._id.toString();
    const meal = await Meal.findOne({_id: mealId,  maintainer});
    if (!meal) {
      throw new Error();
    }

    request.extendedData.meal = meal;

    return request;
  }

  static async authorizeMealsProducts(request: ExtendedRequestType, response: Response, next: NextFunction) {
    try {
      request = await MealAuthorizationService.extendMealRequestWithProperProducts(request);
      next();
    } catch (error) {
      response.status(404).send({error: 'Product not found'});
    }
  }

  static async extendMealRequestWithProperProducts(request: ExtendedRequestType): Promise<ExtendedRequestType> {
    const ingredients = request.body.ingredients;
    const user = request.extendedData!.user;
    const products = [];
    
    if (!user || !ingredients) {
      throw new Error();
    }

    for (let i = 0; i < ingredients.length; i++) {
      const ingredient = ingredients[i];
      const product = await Product.findOne({_id: ingredient.product, maintainer: user._id}) as ProductDataModelInterface;

      if (!product) {
        throw new Error();
      }

      products.push(product);
    }

    request.extendedData!.mealsProducts = products;
    return request;
  }
}
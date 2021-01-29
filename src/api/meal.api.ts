import { Router, Response } from 'express';
import { MealDataModelIdexableInterface } from '../database/interfaces/meal.model.interface';
import Meal from '../database/models/meal';
import { ExtendedRequestType } from '../database/types/extended-requests.type';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { MealAuthorizationService } from '../services/autorization/meal-authorization.service';
import { KilocaloriesCounterService } from '../services/core/kilocalories-counter.service';
import { Ingredient } from '../types/interfaces/ingredient.interface';
import { ProductDataModelInterface } from '../database/interfaces/product.model.interface';

const router = Router();

router.post('/meals', 
  AuthenticationService.authenticateUser,
  MealAuthorizationService.authorizeMealsProducts,
  async (request: ExtendedRequestType, response: Response) => 
  {
    try {
      const maintainer = request.extendedData!.user!._id;
      const extendedBody = { ...request.body, maintainer };
      const extendedIngredients = extendIngrediensWithProductData(extendedBody.ingredients, request.extendedData!.mealsProducts!);
      
      extendedBody.totalKilocalories = KilocaloriesCounterService.count(extendedIngredients);
      
      const meal = new Meal(extendedBody);
      await meal.save();

      response.status(201).send(meal);
    } catch (error) {
      response.status(400).send(error);
    }
  }
);

const extendIngrediensWithProductData = (ingredientsWithProductsIds: Ingredient[], products: ProductDataModelInterface[]) => {
  for (let i = 0; i < ingredientsWithProductsIds.length; i++) {
    const productId = ingredientsWithProductsIds[i].product;
    const product = products.find(product => product._id.toString() === productId.toString());
    if (!product) {
      throw new Error();
    }

    ingredientsWithProductsIds[i].product = product;    
  }

  return ingredientsWithProductsIds;
};

router.get('/meals/:mealId',
  AuthenticationService.authenticateUser,
  MealAuthorizationService.authorizateMeal,
  async (request: ExtendedRequestType, response: Response) => {
    try {
      response.send(request.extendedData!.meal);
    } catch (error) {
      response.status(400).send(error);
    }
  }
);

router.patch('/meals/:mealId',
  AuthenticationService.authenticateUser,
  MealAuthorizationService.authorizateMeal,
  MealAuthorizationService.authorizeMealsProducts,
  async (request: ExtendedRequestType, response: Response) => {
    const allowedFieldsKeys = ['name', 'description', 'recipe', 'ingredients'];
    const bodyFieldKeys = Object.keys(request.body);

    const operationIsValid = bodyFieldKeys.every(key => allowedFieldsKeys.includes(key));
  
    if (!operationIsValid) {
      return response.status(400).send({error: 'Invalid updates'});
    }

    try {
      bodyFieldKeys.forEach(key => (request.extendedData!.meal as MealDataModelIdexableInterface)[key] = request.body[key]);

      const extendedIngredients = extendIngrediensWithProductData(request.extendedData!.meal!.ingredients, request.extendedData!.mealsProducts!);
      request.extendedData!.meal!.totalKilocalories = KilocaloriesCounterService.count(extendedIngredients);

      await request.extendedData!.meal!.save();
  
      response.send(request.extendedData!.meal!);
    } catch (error) {
      response.status(400).send();
    }
  }
);

router.delete('/meals/:mealId',
  AuthenticationService.authenticateUser,
  MealAuthorizationService.authorizateMeal,
  async (request: ExtendedRequestType, response: Response) => {
    try {
      await request.extendedData!.meal!.remove();
      response.send();
    } catch (error) {
      response.status(500).send();
    }
  }
);

export default router;
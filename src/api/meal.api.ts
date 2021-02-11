import { Router, Response } from 'express';
import { MealDataModelIdexableInterface } from '../database/interfaces/meal.model.interface';
import Meal from '../database/models/meal.model';
import { ExtendedRequestType } from './types/extended-requests.type';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { MealAuthorizationService } from '../services/autorization/meal-authorization.service';
import { KilocaloriesCounterService } from '../services/core/kilocalories-counter.service';
import { Ingredient } from '../types/interfaces/ingredient.interface';
import { ProductDataModelInterface } from '../database/interfaces/product.model.interface';
import { CommonUtilService } from '../services/common/common-util.service';

const router = Router();

router.post('/meals', 
  AuthenticationService.authenticateUser,
  MealAuthorizationService.authorizeMealsProducts,
  async (request: ExtendedRequestType, response: Response) => 
  {
    try {
      const maintainer = request.extendedData!.user!._id;
      const extendedBody = { ...request.body, maintainer };
      const extendedIngredients = CommonUtilService.extendIngrediensWithProductData(
        extendedBody.ingredients, 
        request.extendedData!.mealsProducts!
      );
      
      extendedBody.totalKilocalories = KilocaloriesCounterService.countForIngredients(extendedIngredients);
      
      const meal = new Meal(extendedBody);
      await meal.save();

      response.status(201).send(meal);
    } catch (error) {
      response.status(400).send(error);
    }
  }
);

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
    const allowedFieldsKeys = ['name', 'description', 'recipe'];
    const bodyFieldKeys = Object.keys(request.body);

    const operationIsValid = bodyFieldKeys.every(key => allowedFieldsKeys.includes(key));
  
    if (!operationIsValid) {
      return response.status(400).send({error: 'Invalid updates'});
    }

    try {
      bodyFieldKeys.forEach(key => (request.extendedData!.meal as MealDataModelIdexableInterface)[key] = request.body[key]);

      const extendedIngredients = CommonUtilService.extendIngrediensWithProductData(
        request.extendedData!.meal!.ingredients, 
        request.extendedData!.mealsProducts!
      );
      request.extendedData!.meal!.totalKilocalories = KilocaloriesCounterService.countForIngredients(extendedIngredients);

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
import { NextFunction, Response } from 'express';
import { MealDataModelInterface } from '../../database/interfaces/meal.model.interface';
import DietPlanDay from '../../database/models/diet-plan-day';
import Meal from '../../database/models/meal';
import { ExtendedRequestType } from '../../database/types/extended-requests.type';

export class ConsumedMealsHistoryDayAuthorizationService {
  static async authorizateHistoryDay(request: ExtendedRequestType, response: Response, next: NextFunction) {
    try {
      request = await ConsumedMealsHistoryDayAuthorizationService.extendRequestWithProperData(request);
      next();
    } catch (error) {
      response.status(404).send({error: 'Day not found'});
    }
  }

  static async extendRequestWithProperData(request: ExtendedRequestType): Promise<ExtendedRequestType> {
    const planDayId = request.params.planDayId || request.query.planDayId;
    const profile = request.extendedData?.personalProfile;
    
    if (!profile || !planDayId) {
      throw new Error();
    }

    const planDay = await DietPlanDay.findOne({_id: planDayId,  profile: profile._id});
    if (!planDay) {
      throw new Error();
    }

    request.extendedData!.dietPlanDay = planDay;

    return request;
  }

  static async authorizeConsumedMeals(request: ExtendedRequestType, response: Response, next: NextFunction) {
    try {
      request = await ConsumedMealsHistoryDayAuthorizationService.extendPlanDayWithdMealsToConsume(request);
      next();
    } catch (error) {
      response.status(404).send({error: 'Meal not found'});
    }
  }

  static async extendPlanDayWithdMealsToConsume(request: ExtendedRequestType): Promise<ExtendedRequestType> {
    const mealTimes = request.body.mealTimes;
    const user = request.extendedData!.user;
    const profile = request.extendedData?.personalProfile;
    const meals: MealDataModelInterface[] = [];

    if (!user || !mealTimes || !profile) {
      throw new Error();
    }

    for (let i = 0; i < mealTimes.length; i++) {
      const mealId = mealTimes[i].portion.meal;
      const meal = await Meal.findOne({_id: mealId, maintainer: user._id}) as MealDataModelInterface;
      
      if (!meal) {
        throw new Error();
      }

      meals.push(meal);
    }

    request.extendedData!.mealsToConsume = meals;
    return request;
  }
}
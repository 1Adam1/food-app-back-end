import { Router, Response } from 'express';
import { DietPlanDayDataModelIndexableInterface } from '../database/interfaces/diet-plan-day.model.interface';
import { MealDataModelInterface } from '../database/interfaces/meal.model.interface';
import DietPlanDay from '../database/models/diet-plan-day.model';
import { ExtendedRequestType } from './types/extended-requests.type';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { DietPlanDayAuthorizationService } from '../services/autorization/diet-plan-day-authorization';
import { PersonAuthorizationService } from '../services/autorization/person-authorization.service';
import { PersonalProfileAuthorizationService } from '../services/autorization/personal-profile-authorization.srevice';
import { KilocaloriesCounterService } from '../services/core/kilocalories-counter.service';
import { MealTime } from '../types/interfaces/meal-time.interface';

const router = Router();

router.post('/persons/:personId/profiles/:personalProfileId/:diet-plan-days', 
  AuthenticationService.authenticateUser,
  PersonAuthorizationService.authorizatePerson,
  PersonalProfileAuthorizationService.authorizatePersonalProfile,
  DietPlanDayAuthorizationService.authorizeMealsToConsume,
  async (request: ExtendedRequestType, response: Response) => 
  {
    try {
      const personalProfileId = request.extendedData!.personalProfile!._id;
      const extendedBody = { ...request.body, profile: personalProfileId };
      
      extendedBody.mealTimes = extendMealTimesWithMealtData(extendedBody.mealTimes, request.extendedData!.mealsToConsume!);
      extendedBody.totalKilocaloriesConsumption = KilocaloriesCounterService.countForMealTimes(extendedBody.mealTimes);
      
      const dietPlanDay = new DietPlanDay(extendedBody);
      await dietPlanDay.save();

      response.status(201).send(dietPlanDay);
    } catch (error) {
      response.status(400).send(error);
    }
  }
);

const extendMealTimesWithMealtData = (mealTimesWithMealsIds: MealTime[], meals: MealDataModelInterface[]) => {
  for (let i = 0; i < mealTimesWithMealsIds.length; i++) {
    const mealId = mealTimesWithMealsIds[i].portion.meal;
    const meal = meals.find(meal => meal._id.toString() === mealId.toString());
    if (!meal) {
      throw new Error();
    }

    mealTimesWithMealsIds[i].portion.meal = meal;
  }

  return mealTimesWithMealsIds;
};

router.get('/persons/:personId/profiles/:personalProfileId/:diet-plan-days/:planDayId',
  AuthenticationService.authenticateUser,
  PersonAuthorizationService.authorizatePerson,
  PersonalProfileAuthorizationService.authorizatePersonalProfile,
  DietPlanDayAuthorizationService.authorizatePlanDay,
  async (request: ExtendedRequestType, response: Response) => 
  {
    try {
      response.send(request.extendedData!.dietPlanDay);
    } catch (error) {
      response.status(400).send(error);
    }
  }
);

router.patch('/persons/:personId/profiles/:personalProfileId/:diet-plan-days/:planDayId',
  AuthenticationService.authenticateUser,
  PersonAuthorizationService.authorizatePerson,
  PersonalProfileAuthorizationService.authorizatePersonalProfile,
  DietPlanDayAuthorizationService.authorizatePlanDay,
  DietPlanDayAuthorizationService.authorizeMealsToConsume,
  async (request: ExtendedRequestType, response: Response) => {
    const allowedFieldsKeys = ['date', 'mealTimes', 'description'];
    const bodyFieldKeys = Object.keys(request.body);
    const operationIsValid = bodyFieldKeys.every(key => allowedFieldsKeys.includes(key));
  
    if (!operationIsValid) {
      return response.status(400).send({error: 'Invalid updates'});
    }

    try {
      bodyFieldKeys.forEach(key => 
        (request.extendedData!.dietPlanDay as DietPlanDayDataModelIndexableInterface)[key] 
        = request.body[key]);

      request.extendedData!.dietPlanDay!.mealTimes = 
          extendMealTimesWithMealtData(request.extendedData!.dietPlanDay!.mealTimes, request.extendedData!.mealsToConsume!);
      request.extendedData!.dietPlanDay!.totalKilocaloriesConsumption 
        = KilocaloriesCounterService.countForMealTimes(request.extendedData!.dietPlanDay!.mealTimes);

      await request.extendedData!.dietPlanDay!.save();
  
      response.send(request.extendedData!.dietPlanDay);
    } catch (error) {
      response.status(400).send();
    }
  }
);

router.delete('/persons/:personId/profiles/:personalProfileId/diet-plan-days/:planDayId',
  AuthenticationService.authenticateUser,
  PersonAuthorizationService.authorizatePerson,
  PersonalProfileAuthorizationService.authorizatePersonalProfile,
  DietPlanDayAuthorizationService.authorizatePlanDay,
  async (request: ExtendedRequestType, response: Response) => {
    try {
      await request.extendedData!.dietPlanDay!.remove();
      response.send();
    } catch (error) {
      response.status(500).send();
    }
  }
);

router.get('/persons/:personId/profiles/:personalProfileId/diet-plan-days',
  AuthenticationService.authenticateUser,
  PersonAuthorizationService.authorizatePerson,
  PersonalProfileAuthorizationService.authorizatePersonalProfile,
  async (request: ExtendedRequestType, response: Response) => 
  {
    try {
      const profile = request.extendedData!.personalProfile;
      const result = await profile!.populate({path: 'dietPlan'}).execPopulate();
      const dietPlan = result.dietPlan;
      response.send(dietPlan);
    } catch (error) {
      response.status(400).send(error);
    }
  }
);

export default router;
import { Router, Response } from 'express';
import { ConsumedMealsHistoryDayDataModelIndexableInterface } from '../database/interfaces/consumed-meals-history-day.interface';
import ConsumedMealsHistoryDay from '../database/models/consumed-meals-history-day';
import { ExtendedRequestType } from '../database/types/extended-requests.type';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { ConsumedMealsHistoryDayAuthorizationService } from '../services/autorization/consumed-meals-history-day-authorization.service';
import { PersonAuthorizationService } from '../services/autorization/person-authorization.service';
import { PersonalProfileAuthorizationService } from '../services/autorization/personal-profile-authorization.srevice';
import { KilocaloriesCounterService } from '../services/core/kilocalories-counter.service';

const router = Router();

router.post('/persons/:personId/profiles/:personalProfileId/consumed-meals-history-days', 
  AuthenticationService.authenticateUser,
  PersonAuthorizationService.authorizatePerson,
  PersonalProfileAuthorizationService.authorizatePersonalProfile,
  ConsumedMealsHistoryDayAuthorizationService.authorizeConsumedMeals,
  async (request: ExtendedRequestType, response: Response) => 
  {
    try {
      const personalProfileId = request.extendedData!.personalProfile!._id;
      const extendedBody = { ...request.body, profile: personalProfileId };

      extendedBody.totalKilocaloriesConsumption = KilocaloriesCounterService.countForMealTimes(extendedBody.mealTimes);
      
      const consumedMealsHistoryDay = new ConsumedMealsHistoryDay(extendedBody);
      await consumedMealsHistoryDay.save();

      response.status(201).send(consumedMealsHistoryDay);
    } catch (error) {
      response.status(400).send(error);
    }
  }
);

router.get('/persons/:personId/profiles/:personalProfileId/consumed-meals-history-days/:historyDayId',
  AuthenticationService.authenticateUser,
  PersonAuthorizationService.authorizatePerson,
  PersonalProfileAuthorizationService.authorizatePersonalProfile,
  ConsumedMealsHistoryDayAuthorizationService.authorizateHistoryDay,
  async (request: ExtendedRequestType, response: Response) => 
  {
    try {
      response.send(request.extendedData!.consumedMealsHistoryDay);
    } catch (error) {
      response.status(400).send(error);
    }
  }
);

router.patch('/persons/:personId/profiles/:personalProfileId/consumed-meals-history-days/:historyDayId',
  AuthenticationService.authenticateUser,
  PersonAuthorizationService.authorizatePerson,
  PersonalProfileAuthorizationService.authorizatePersonalProfile,
  ConsumedMealsHistoryDayAuthorizationService.authorizateHistoryDay,
  ConsumedMealsHistoryDayAuthorizationService.authorizeConsumedMeals,
  async (request: ExtendedRequestType, response: Response) => {
    const allowedFieldsKeys = ['date', 'mealTimes', 'description'];
    const bodyFieldKeys = Object.keys(request.body);
    const operationIsValid = bodyFieldKeys.every(key => allowedFieldsKeys.includes(key));
  
    if (!operationIsValid) {
      return response.status(400).send({error: 'Invalid updates'});
    }

    try {
      bodyFieldKeys.forEach(key => 
        (request.extendedData!.consumedMealsHistoryDay as ConsumedMealsHistoryDayDataModelIndexableInterface)[key] 
        = request.body[key]);

      request.extendedData!.consumedMealsHistoryDay!.totalKilocaloriesConsumption 
        = KilocaloriesCounterService.countForMealTimes(request.extendedData!.consumedMealsHistoryDay!.mealTimes);

      await request.extendedData!.consumedMealsHistoryDay!.save();
  
      response.send(request.extendedData!.consumedMealsHistoryDay);
    } catch (error) {
      response.status(400).send();
    }
  }
);

router.delete('/persons/:personId/profiles/:personalProfileId/consumed-meals-history-days/:historyDayId',
  AuthenticationService.authenticateUser,
  PersonAuthorizationService.authorizatePerson,
  PersonalProfileAuthorizationService.authorizatePersonalProfile,
  ConsumedMealsHistoryDayAuthorizationService.authorizateHistoryDay,
  async (request: ExtendedRequestType, response: Response) => {
    try {
      await request.extendedData!.consumedMealsHistoryDay!.remove();
      response.send();
    } catch (error) {
      response.status(500).send();
    }
  }
);

router.get('/persons/:personId/profiles/:personalProfileId/consumed-meals-history-days',
  AuthenticationService.authenticateUser,
  PersonAuthorizationService.authorizatePerson,
  PersonalProfileAuthorizationService.authorizatePersonalProfile,
  async (request: ExtendedRequestType, response: Response) => 
  {
    try {
      const profile = request.extendedData!.personalProfile;
      const result = await profile!.populate({path: 'consumedMealsHistory'}).execPopulate();
      const consumedMealsHistory = result.consumedMealsHistory;
      response.send(consumedMealsHistory);
    } catch (error) {
      response.status(400).send(error);
    }
  }
);

export default router;
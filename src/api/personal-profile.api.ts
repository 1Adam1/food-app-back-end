import { Router, Response } from 'express';
import { PersonalProfileDataModelIdexableInterface } from '../database/interfaces/personal-profile.interface';
import PersonalProfile from '../database/models/personal-profile.model';
import { ExtendedRequestType } from './types/extended-requests.type';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { PersonAuthorizationService } from '../services/autorization/person-authorization.service';
import { PersonalProfileAuthorizationService } from '../services/autorization/personal-profile-authorization.srevice';

const router = Router();

router.post('/persons/:personId/profiles', 
  AuthenticationService.authenticateUser,
  PersonAuthorizationService.authorizatePerson,
  async (request: ExtendedRequestType, response: Response) => 
  {
    try {
      const personId = request.extendedData!.person!._id;
      const extendedBody = { ...request.body, person: personId };

      const personalProflie = new PersonalProfile(extendedBody);
      await personalProflie.save();

      response.status(201).send(personalProflie);
    } catch (error) {
      response.status(400).send(error);
    }
  }
);

router.get('/persons/:personId/profiles/:personalProfileId',
  AuthenticationService.authenticateUser,
  PersonAuthorizationService.authorizatePerson,
  PersonalProfileAuthorizationService.authorizatePersonalProfile,
  async (request: ExtendedRequestType, response: Response) => {
    try {
      response.send(request.extendedData!.personalProfile);
    } catch (error) {
      response.status(400).send(error);
    }
  }
);

router.patch('/persons/:personId/profiles/:personalProfileId',
  AuthenticationService.authenticateUser,
  PersonAuthorizationService.authorizatePerson,
  PersonalProfileAuthorizationService.authorizatePersonalProfile,
  async (request: ExtendedRequestType, response: Response) => {
    const allowedFieldsKeys = ['name', 'description', 'dailyKilocalorieIntake'];
    const bodyFieldKeys = Object.keys(request.body);
    const operationIsValid = bodyFieldKeys.every(key => allowedFieldsKeys.includes(key));
  
    if (!operationIsValid) {
      return response.status(400).send({error: 'Invalid updates'});
    }

    try {
      bodyFieldKeys.forEach(key => (request.extendedData!.personalProfile as PersonalProfileDataModelIdexableInterface)[key] = request.body[key]);
      await request.extendedData!.personalProfile!.save();
  
      response.send(request.extendedData!.personalProfile);
    } catch (error) {
      response.status(400).send();
    }
  }
);

router.delete('/persons/:personId/profiles/:personalProfileId',
  AuthenticationService.authenticateUser,
  PersonAuthorizationService.authorizatePerson,
  PersonalProfileAuthorizationService.authorizatePersonalProfile,
  async (request: ExtendedRequestType, response: Response) => {
    try {
      await request.extendedData!.personalProfile!.remove();
      response.send();
    } catch (error) {
      response.status(500).send();
    }
  }
);

router.get('/persons/:personId/profiles',
  AuthenticationService.authenticateUser,
  PersonAuthorizationService.authorizatePerson,
  async (request: ExtendedRequestType, response: Response) => 
  {
    try {
      const person = request.extendedData!.person;
      const result = await person!.populate({path: 'profiles'}).execPopulate();
      const profiles = result.profiles;
      response.send(profiles);
    } catch (error) {
      response.status(400).send(error);
    }
  }
);

export default router;
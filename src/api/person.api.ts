import { Router, Response } from 'express';
import { PersonDataModelIdexableInterface } from '../database/interfaces/person.model.inteface';
import Person from '../database/models/person';
import { ExtendedRequestType } from '../database/types/extended-requests.type';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { PersonAuthorizationService } from '../services/autorization/person-authorization.service';

const router = Router();

router.post('/persons', 
  AuthenticationService.authenticateUser,
  async (request: ExtendedRequestType, response: Response) => 
  {
    try {
      const maintainer = request.extendedData!.user!._id;
      const extendedBody = { ...request.body, maintainer };

      const person = new Person(extendedBody);
      await person.save();

      response.status(201).send(person.toJSON());
    } catch (error) {
      response.status(400).send(error);
    }
  }
);

router.get('/persons/:personId',
  AuthenticationService.authenticateUser,
  PersonAuthorizationService.autorizatePerson,
  async (request: ExtendedRequestType, response: Response) => 
  {
    try {
      response.send(request.extendedData!.person);
    } catch (error) {
      response.status(400).send(error);
    }
  }
);

router.patch('/persons/:personId',
  AuthenticationService.authenticateUser,
  PersonAuthorizationService.autorizatePerson,
  async (request: ExtendedRequestType, response: Response) => {
    const allowedFieldsKeys = ['name', 'surname', 'dateOfBirth', 'gender', 'description'];
    const bodyFieldKeys = Object.keys(request.body);
    const operationIsValid = bodyFieldKeys.every(key => allowedFieldsKeys.includes(key));
  
    if (!operationIsValid) {
      return response.status(400).send({error: 'Invalid updates'});
    }

    try {
      bodyFieldKeys.forEach(key => (request.extendedData!.person as PersonDataModelIdexableInterface)[key] = request.body[key]);
      await request.extendedData!.person!.save();
  
      response.send(request.extendedData!.person);
    } catch (error) {
      response.status(400).send();
    }
  }
);

router.delete('/persons/:personId',
  AuthenticationService.authenticateUser,
  PersonAuthorizationService.autorizatePerson,
  async (request: ExtendedRequestType, response: Response) => {
    try {
      await request.extendedData!.person!.remove();
      response.send();
    } catch (error) {
      response.status(500).send();
    }
  }
);

router.get('/persons/:personId/profiles',
  AuthenticationService.authenticateUser,
  PersonAuthorizationService.autorizatePerson,
  async (request: ExtendedRequestType, response: Response) => 
  {
    try {
      const person = request.extendedData!.person;
      const results = await person!.populate({path: 'profiles'}).execPopulate();
      response.send(results);
    } catch (error) {
      response.status(400).send(error);
    }
  }
);

export default router;
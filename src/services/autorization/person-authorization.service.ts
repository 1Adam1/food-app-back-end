import { NextFunction, Response } from 'express';
import Person from '../../database/models/person.model';
import { ExtendedRequestType } from '../../api/types/extended-requests.type';

export class PersonAuthorizationService {
  static async authorizatePerson(request: ExtendedRequestType, response: Response, next: NextFunction) {
    try {
      request = await PersonAuthorizationService.extendRequestWithProperData(request);
      next();
    } catch (error) {
      response.status(404).send({error: 'Person not found'});
    }
  }

  static async extendRequestWithProperData(request: ExtendedRequestType): Promise<ExtendedRequestType> {
    const personId = request.params.personId || request.query.personId;
    
    if (!request.extendedData?.user || !personId) {
      throw new Error();
    }

    const maintainer = request.extendedData.user._id.toString();
    const person = await Person.findOne({_id: personId,  maintainer});
    if (!person) {
      throw new Error();
    }

    request.extendedData.person = person;

    return request;
  }
}

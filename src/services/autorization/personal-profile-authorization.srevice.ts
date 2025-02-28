import { NextFunction, Response } from 'express';
import PersonalProfile from '../../database/models/personal-profile.model';
import { ExtendedRequestType } from '../../api/types/extended-requests.type';

export class PersonalProfileAuthorizationService {
  static async authorizatePersonalProfile(request: ExtendedRequestType, response: Response, next: NextFunction) {
    try {
      request = await PersonalProfileAuthorizationService.extendRequestWithProperData(request);
      next();
    } catch (error) {
      response.status(404).send({error: 'Personal profile not found'});
    }
  }

  static async extendRequestWithProperData(request: ExtendedRequestType): Promise<ExtendedRequestType> {
    const personalProfileId = request.params.personalProfileId || request.query.personalProfileId;
    const person = request.extendedData!.person;
    
    if (!request.extendedData?.user || !person || !personalProfileId) {
      throw new Error();
    }

    const personalProfile = await PersonalProfile.findOne({_id: personalProfileId, person: person._id});
    
    if (!personalProfile) {
      throw new Error();
    }

    request.extendedData.personalProfile = personalProfile;

    return request;
  }
}

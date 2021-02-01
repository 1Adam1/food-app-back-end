import { Router, Response } from 'express';
import { ShopDataModelIdexableInterface } from '../database/interfaces/shop.model.interface';
import Shop from '../database/models/shop.model';
import { ExtendedRequestType } from './types/extended-requests.type';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { ShopAuthorizationService } from '../services/autorization/shop-autorization.service';

const router = Router();

router.post('/shops', AuthenticationService.authenticateUser, async (request: ExtendedRequestType, response: Response) => {
  try {
    const maintainer = request.extendedData!.user!._id;
    const extendedBody = { ...request.body, maintainer };
    const shop = new Shop(extendedBody);

    await shop.save();

    response.status(201).send(shop);
  } catch (error) {
    response.status(400).send(error);
  }
});

router.get('/shops/:shopId',
  AuthenticationService.authenticateUser,
  ShopAuthorizationService.authorizateShop,
  async (request: ExtendedRequestType, response: Response) => {
    try {
      response.send(request.extendedData!.shop);
    } catch (error) {
      response.status(400).send(error);
    }
  }
);

router.patch('/shops/:shopId',
  AuthenticationService.authenticateUser,
  ShopAuthorizationService.authorizateShop,
  async (request: ExtendedRequestType, response: Response) => {
    const allowedFieldsKeys = ['name', 'description'];
    const bodyFieldKeys = Object.keys(request.body);
    const operationIsValid = bodyFieldKeys.every(key => allowedFieldsKeys.includes(key));
  
    if (!operationIsValid) {
      return response.status(400).send({error: 'Invalid updates'});
    }

    try {
      bodyFieldKeys.forEach(key => (request.extendedData!.shop as ShopDataModelIdexableInterface)[key] = request.body[key]);
      await request.extendedData!.shop!.save();
  
      response.send(request.extendedData!.shop!);
    } catch (error) {
      response.status(400).send();
    }
  }
);

router.delete('/shops/:shopId',
  AuthenticationService.authenticateUser,
  ShopAuthorizationService.authorizateShop,
  async (request: ExtendedRequestType, response: Response) => {
    try {
      await request.extendedData!.shop!.remove();
      response.send();
    } catch (error) {
      response.status(500).send();
    }
  }
);

router.get('/shops/:shopId/offers', 
  AuthenticationService.authenticateUser,
  ShopAuthorizationService.authorizateShop,
  async (request: ExtendedRequestType, response: Response) => {
    try {
      const shop = request.extendedData!.shop;
      const result = await shop!.populate({path: 'offers'}).execPopulate();
  
      response.send(result.offers);
    } catch (error) {
      response.status(500).send();
    }
  }
);

export default router;
import { Router, Response } from 'express';
import { ShopDataModelIdexableInterface } from '../database-models/interfaces/shop.model.interface';
import Shop from '../database-models/shop';
import { ExtendedRequestType } from '../database-models/types/extended-requests.type';
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

router.get('/shops/:id',
  AuthenticationService.authenticateUser,
  ShopAuthorizationService.autorizateShop,
  async (request: ExtendedRequestType, response: Response) => {
    try {
      response.send(request.extendedData!.shop);
    } catch (error) {
      response.status(400).send(error);
    }
  }
);

router.patch('/shops/:id',
  AuthenticationService.authenticateUser,
  ShopAuthorizationService.autorizateShop,
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

router.delete('/shops/:id',
  AuthenticationService.authenticateUser,
  ShopAuthorizationService.autorizateShop,
  async (request: ExtendedRequestType, response: Response) => {
    try {
      await request.extendedData!.shop!.remove();
      response.send();
    } catch (error) {
      response.status(500).send();
    }
  }
);

export default router;
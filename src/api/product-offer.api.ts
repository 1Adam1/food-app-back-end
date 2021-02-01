import { Router, Response } from 'express';
import { ProductOfferDataModelIdexableInterface } from '../database/interfaces/product-offer.model.interface';
import ProductOffer from '../database/models/product-offer.model';
import { ExtendedRequestType } from './types/extended-requests.type';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { ProductAuthorizationService } from '../services/autorization/product-autorization.service';
import { ProductOfferAuthorizationService } from '../services/autorization/product-offer-authorization.service';
import { ShopAuthorizationService } from '../services/autorization/shop-autorization.service';

const router = Router();

router.post('/product-offers', 
    AuthenticationService.authenticateUser,
    ShopAuthorizationService.authorizateShop,
    ProductAuthorizationService.authorizateProduct,
    async (request: ExtendedRequestType, response: Response) => {
  try {
    const shop = request.extendedData!.shop!._id;
    const product = request.extendedData!.product!._id;
    const extendedBody = { ...request.body, product, shop };
    const productOffer = new ProductOffer(extendedBody);

    await productOffer.save();

    response.status(201).send(productOffer);
  } catch (error) {
    response.status(400).send(error);
  }
});

router.get('/product-offers/:productOfferId',
  AuthenticationService.authenticateUser,
  ProductOfferAuthorizationService.authorizateProductOffer,
  async (request: ExtendedRequestType, response: Response) => {
    try {
      response.send(request.extendedData!.productOffer);
    } catch (error) {
      response.status(400).send(error);
    }
  }
);

router.patch('/product-offers/:productOfferId',
  AuthenticationService.authenticateUser,
  ProductOfferAuthorizationService.authorizateProductOffer,
  async (request: ExtendedRequestType, response: Response) => {
    const allowedFieldsKeys = ['name', 'description'];
    const bodyFieldKeys = Object.keys(request.body);
    const operationIsValid = bodyFieldKeys.every(key => allowedFieldsKeys.includes(key));
  
    if (!operationIsValid) {
      return response.status(400).send({error: 'Invalid updates'});
    }

    try {
      bodyFieldKeys.forEach(key => (request.extendedData!.productOffer as ProductOfferDataModelIdexableInterface)[key] = request.body[key]);
      await request.extendedData!.productOffer!.save();
  
      response.send(request.extendedData!.productOffer!);
    } catch (error) {
      response.status(400).send();
    }
  }
);

router.delete('/product-offers/:productOfferId',
  AuthenticationService.authenticateUser,
  ProductOfferAuthorizationService.authorizateProductOffer,
  async (request: ExtendedRequestType, response: Response) => {
    try {
      await request.extendedData!.productOffer!.remove();
      response.send();
    } catch (error) {
      response.status(500).send();
    }
  }
);

export default router;
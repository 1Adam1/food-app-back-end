import { Router, Response } from 'express';
import ProductOffer from '../database-models/product-offer';
import { ExtendedRequestType } from '../database-models/types/extended-requests.type';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { ProductAuthorizationService } from '../services/autorization/product-autorization.service';
import { ShopAuthorizationService } from '../services/autorization/shop-autorization.service';

const router = Router();

router.post('/product-offers', 
    AuthenticationService.authenticateUser,
    ShopAuthorizationService.autorizateShop,
    ProductAuthorizationService.autorizateProduct,
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

export default router;
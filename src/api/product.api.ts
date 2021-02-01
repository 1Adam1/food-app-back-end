import { Router, Response } from 'express';
import { ProductDataModelIdexableInterface } from '../database/interfaces/product.model.interface';
import Product from '../database/models/product.model';
import { ExtendedRequestType } from './types/extended-requests.type';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { ProductAuthorizationService } from '../services/autorization/product-autorization.service';

const router = Router();

router.post('/products', AuthenticationService.authenticateUser, async (request: ExtendedRequestType, response: Response) => {
  try {
    const maintainer = request.extendedData!.user!._id;
    const extendedBody = { ...request.body, maintainer };
    const product = new Product(extendedBody);

    await product.save();

    response.status(201).send(product);
  } catch (error) {
    response.status(400).send(error);
  }
});

router.get('/products/:productId',
  AuthenticationService.authenticateUser,
  ProductAuthorizationService.authorizateProduct,
  async (request: ExtendedRequestType, response: Response) => {
    try {
      response.send(request.extendedData!.product);
    } catch (error) {
      response.status(400).send(error);
    }
  }
);

router.patch('/products/:productId',
  AuthenticationService.authenticateUser,
  ProductAuthorizationService.authorizateProduct,
  async (request: ExtendedRequestType, response: Response) => {
    const allowedFieldsKeys = ['name', 'description'];
    const bodyFieldKeys = Object.keys(request.body);
    const operationIsValid = bodyFieldKeys.every(key => allowedFieldsKeys.includes(key));
  
    if (!operationIsValid) {
      return response.status(400).send({error: 'Invalid updates'});
    }

    try {
      bodyFieldKeys.forEach(key => (request.extendedData!.product as ProductDataModelIdexableInterface)[key] = request.body[key]);
      await request.extendedData!.product!.save();
  
      response.send(request.extendedData!.product!);
    } catch (error) {
      response.status(400).send();
    }
  }
);

router.delete('/products/:productId',
  AuthenticationService.authenticateUser,
  ProductAuthorizationService.authorizateProduct,
  async (request: ExtendedRequestType, response: Response) => {
    try {
      await request.extendedData!.product!.remove();
      response.send();
    } catch (error) {
      response.status(500).send();
    }
  }
);

router.get('/products/:productId/offers', 
  AuthenticationService.authenticateUser,
  ProductAuthorizationService.authorizateProduct,
  async (request: ExtendedRequestType, response: Response) => {
    try {
      const product = request.extendedData!.product;
      const result = await product!.populate({path: 'offers'}).execPopulate();
  
      response.send(result.offers);
    } catch (error) {
      response.status(500).send();
    }
  }
);

export default router;
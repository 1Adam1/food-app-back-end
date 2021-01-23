import { Response, NextFunction } from 'express';
import Product from '../../database-models/product';
import { ExtendedRequestType } from '../../database-models/types/extended-requests.type';

export class ProductAuthorizationService {
  static async autorizateShop(request: ExtendedRequestType, response: Response, next: NextFunction) {
    try {
      if (!request.extendedData?.user || !request.params.id) {
        throw new Error();
      }

      const maintainer = request.extendedData.user._id;
      const product = await Product.findOne({_id: request.params.id,  maintainer})

      if (!product) {
        throw new Error();
      }

      request.extendedData.product = product;
      next();
    } catch (error) {
      response.status(404).send({error: 'Product not found'});
    }
  }
}
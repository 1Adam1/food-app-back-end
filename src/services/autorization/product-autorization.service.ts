import { Response, NextFunction } from 'express';
import Product from '../../database-models/product';
import { ExtendedRequestType } from '../../database-models/types/extended-requests.type';

export class ProductAuthorizationService {
  static async autorizateProduct(request: ExtendedRequestType, response: Response, next: NextFunction) {
    try {
      request = await ProductAuthorizationService.extendRequestWithProperProduct(request);
      next();
    } catch (error) {
      response.status(404).send({error: 'Product not found'});
    }
  }

  static async extendRequestWithProperProduct(request: ExtendedRequestType): Promise<ExtendedRequestType> {
    const productId = request.params.productId || request.query.productId;

    if (!request.extendedData?.user || !productId) {
      throw new Error();
    }

    const maintainer = request.extendedData.user._id;
    const product = await Product.findOne({_id: productId,  maintainer})

    if (!product) {
      throw new Error();
    }

    request.extendedData.product = product;

    return request;
  }
}
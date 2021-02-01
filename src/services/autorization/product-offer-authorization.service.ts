import { Response, NextFunction } from 'express';
import ProductOffer from '../../database/models/product-offer.model';
import { ExtendedRequestType } from '../../api/types/extended-requests.type';
import { ProductAuthorizationService } from './product-autorization.service';
import { ShopAuthorizationService } from './shop-autorization.service';

export class ProductOfferAuthorizationService {
  static async authorizateProductOffer(request: ExtendedRequestType, response: Response, next: NextFunction) {
    try {
      request = await ProductOfferAuthorizationService.extendRequestWithProperData(request);
      next();
    } catch (error) {
      response.status(404).send({error: 'Product offer not found'});
    }
  }

  static async extendRequestWithProperData(request: ExtendedRequestType): Promise<ExtendedRequestType> {
    const productOfferId = request.params.productOfferId || request.query.productOfferId;
    
    if (!request.extendedData?.user || !productOfferId) {
      throw new Error();
    }

    const productOffer = await ProductOffer.findOne({_id: productOfferId});
    if (!productOffer) {
      throw new Error();
    }

    request.extendedData.productOffer = productOffer;
    request.query.shopId = productOffer.shop;
    request.query.productId = productOffer.product;

    request = await ProductAuthorizationService.extendRequestWithProperData(request);
    request = await ShopAuthorizationService.extendRequestWithProperData(request); 
    
    return request;
  }
}
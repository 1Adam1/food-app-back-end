import { Response, NextFunction } from 'express';
import Shop from '../../database-models/shop';
import { ExtendedRequestType } from '../../database-models/types/extended-requests.type';

export class ShopAuthorizationService {
  static async autorizateShop(request: ExtendedRequestType, response: Response, next: NextFunction) {
    try {
      request = await ShopAuthorizationService.extendRequestWithProperProduct(request);
      next();
    } catch (error) {
      response.status(404).send({error: 'Shop not found'});
    }
  }

  static async extendRequestWithProperProduct(request: ExtendedRequestType): Promise<ExtendedRequestType> {
    const shopId = request.params.shopId || request.query.shopId;

    if (!request.extendedData?.user || !shopId) {
      throw new Error();
    }

    const maintainer = request.extendedData.user._id;
    const shop = await Shop.findOne({_id: shopId,  maintainer})

    if (!shop) {
      throw new Error();
    }

    request.extendedData.shop = shop;
    
    return request;
  }
}
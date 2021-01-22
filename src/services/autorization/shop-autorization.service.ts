import { Response, NextFunction } from 'express';
import Shop from '../../database-models/shop';
import { ExtendedRequestType } from '../../database-models/types/extended-requests.type';

export class ShopAuthorizationService {
  static async autorizateShop(request: ExtendedRequestType, response: Response, next: NextFunction) {
    try {
      if (!request.extendedData?.user || !request.params.id) {
        throw new Error();
      }

      const maintainer = request.extendedData.user._id;
      const shop = await Shop.findOne({_id: request.params.id,  maintainer})

      if (!shop) {
        throw new Error();
      }

      request.extendedData.shop = shop;
      next();
    } catch (error) {
      response.status(404).send({error: 'Shop not found'});
    }
  }
}
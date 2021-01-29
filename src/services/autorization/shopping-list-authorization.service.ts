import { Response, NextFunction } from 'express';
import { ProductOfferDataModelIdexableInterface } from '../../database/interfaces/product-offer.model.interface';
import Product from '../../database/models/product';
import ProductOffer from '../../database/models/product-offer';
import Shop from '../../database/models/shop';
import ShoppingList from '../../database/models/shopping-list';
import { ExtendedRequestType } from '../../database/types/extended-requests.type';

export class ShoppingListAuthorizationService {
  static async authorizateShoppingList(request: ExtendedRequestType, response: Response, next: NextFunction) {
    try {
      request = await ShoppingListAuthorizationService.extendRequestWithProperData(request);
      next();
    } catch (error) {
      response.status(404).send({error: 'Shopping list not found'});
    }
  }

  static async extendRequestWithProperData(request: ExtendedRequestType): Promise<ExtendedRequestType> {
    const shoppingListId = request.params.shoppingListId || request.query.shoppingListId;

    if (!request.extendedData?.user || !shoppingListId) {
      throw new Error();
    }

    const maintainer = request.extendedData.user._id;
    const shoppingList = await ShoppingList.findOne({_id: shoppingListId,  maintainer})

    if (!shoppingList) {
      throw new Error();
    }

    request.extendedData.shoppingList = shoppingList;

    return request;
  }

  static async authorizeShoppingListsItems(request: ExtendedRequestType, response: Response, next: NextFunction) {
    try {
      request = await ShoppingListAuthorizationService.extendShoppingListRequestWithProperItems(request);
      next();
    } catch (error) {
      response.status(404).send({error: 'Product offer not found'});
    }
  }

  static async extendShoppingListRequestWithProperItems(request: ExtendedRequestType): Promise<ExtendedRequestType> {
    const items = request.body.items;
    const user = request.extendedData!.user;
    const productOffers = [];
    
    if (!user || !items) {
      throw new Error();
    }

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const productOffer = await ProductOffer.findOne({_id: item.item}) as ProductOfferDataModelIdexableInterface;

      if (!productOffer) {
        throw new Error();
      }

      const shop = await Shop.findOne({_id: productOffer.shop, maintainer: user._id});
      const product = await Product.findOne({_id: productOffer.product, maintainer: user._id});

      if (!shop || !product) {
        throw new Error();
      }

      productOffers.push(productOffer);
    }

    request.extendedData!.shoppingListItems = productOffers;
    return request;
  }
}
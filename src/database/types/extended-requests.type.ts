import { Request } from 'express';
import { ShoppingList } from '../../types/interfaces/shopping-list.interface';
import { Token } from '../../types/interfaces/token';
import { MealDataModelInterface } from '../interfaces/meal.model.interface';
import { ProductOfferDataModelInterface } from '../interfaces/product-offer.model.interface';
import { ProductDataModelInterface } from '../interfaces/product.model.interface';
import { ShopDataModelInterface } from '../interfaces/shop.model.interface';
import { ShoppingListDataModelInterface } from '../interfaces/shopping-list.model.interface';
import { UserDataModelInterface } from '../interfaces/user-data.model.interface';

interface ExtendedData {
  extendedData?: {
    user?: UserDataModelInterface;
    token?: Token;
    shop?: ShopDataModelInterface;
    product?: ProductDataModelInterface;
    productOffer?: ProductOfferDataModelInterface;
    meal?: MealDataModelInterface;
    mealsProducts?: ProductDataModelInterface[];
    shoppingList?: ShoppingListDataModelInterface;
    shoppingListItems?: ProductOfferDataModelInterface[];
  }; 
}

export type ExtendedRequestType = ExtendedData & Request;
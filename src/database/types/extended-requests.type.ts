import { Request } from 'express';
import { Token } from '../../types/interfaces/token';
import { MealDataModelInterface } from '../interfaces/meal.model.interface';
import { ProductOfferDataModelInterface } from '../interfaces/product-offer.model.interface';
import { ProductDataModelInterface } from '../interfaces/product.model.interface';
import { ShopDataModelInterface } from '../interfaces/shop.model.interface';
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
  }; 
}

export type ExtendedRequestType = ExtendedData & Request;
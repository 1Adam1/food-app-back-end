import { Request } from 'express';
import { Token } from '../../types/interfaces/token';
import { ShopDataModelInterface } from '../interfaces/shop.model.interface';
import { UserDataModelInterface } from '../interfaces/user-data.model.interface';

interface ExtendedData {
  extendedData?: {
    user?: UserDataModelInterface;
    token?: Token;
    shop?: ShopDataModelInterface
  };
}

export type ExtendedRequestType = ExtendedData & Request;
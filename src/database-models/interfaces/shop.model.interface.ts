import { Document, ObjectId } from 'mongoose';
import { Shop } from '../../types/interfaces/shop.interface';

export interface ShopDataModelInterface extends Document, Shop {
}

export interface ShopDataModelIdexableInterface extends ShopDataModelInterface {
  [key: string]: any;
}
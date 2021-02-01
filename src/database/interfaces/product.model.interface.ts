import { Document } from 'mongoose';
import { Product } from '../../types/interfaces/product.interface';
import { ProductOfferDataModelInterface } from './product-offer.model.interface';

export interface ProductDataModelInterface extends Document, Product {
  offers?: ProductOfferDataModelInterface[];
}

export interface ProductDataModelIdexableInterface extends ProductDataModelInterface {
  [key: string]: any;
}
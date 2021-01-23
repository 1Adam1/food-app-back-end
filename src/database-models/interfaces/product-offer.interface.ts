import { Document } from 'mongoose';
import { ProductOffer } from '../../types/interfaces/product-offer.interface';

export interface ProductOfferDataModelInterface extends Document, ProductOffer {
}

export interface ProductOfferDataModelIdexableInterface extends ProductOfferDataModelInterface {
  [key: string]: any;
}
import { Document } from 'mongoose';
import { Product } from '../../types/interfaces/product.interface';

export interface ProductDataModelInterface extends Document, Product {
}

export interface ProductDataModelIdexableInterface extends ProductDataModelInterface {
  [key: string]: any;
}
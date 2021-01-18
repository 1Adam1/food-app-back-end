import { Price } from "./price.interface";
import { Product } from "./product.interface";

export interface ProductOffer {
  name: string;
  description: string;
  product: Product;
  price: Price;
  sizeInUnits: number;
}
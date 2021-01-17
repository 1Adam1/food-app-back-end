import { Price } from "./price";
import { Product } from "./product";

export class ProductOffer {
  name!: string;
  description!: string;
  product!: Product;
  price!: Price;
  sizeInUnits!: number;
}
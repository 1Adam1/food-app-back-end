import { Price } from "./price.interface";
import { ProductOffer } from "./product-offer.interface";

export interface ShoppingList {
  items: ProductOffer[];
  date: Date;
  totalAmount: Price | undefined;
  partialAmount: Price | undefined;  
}
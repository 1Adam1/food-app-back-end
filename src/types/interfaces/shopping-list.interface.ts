import { Price } from "./price.interface";
import { ProductOffer } from "./product-offer.interface";

export interface ShoppingList {
  items: ProductOffer[];
  description: string;
  date: Date;
  totalPrice: Price | undefined;
}
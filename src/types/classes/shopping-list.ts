import { Price } from "./price";
import { ProductOffer } from "./product-offer";

export class ShoppingList {
  items!: ProductOffer[];
  date!: Date;
  totalAmount: Price | undefined;
  partialAmount: Price | undefined;  
}
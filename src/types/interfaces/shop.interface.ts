import { ProductOffer } from "./product-offer.interface";

export interface Shop {
  name: string;
  description: string;
  offers: ProductOffer[];
}
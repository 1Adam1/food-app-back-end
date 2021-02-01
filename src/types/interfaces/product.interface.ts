import { Unit } from "../enums/unit.enum";
import { ProductOffer } from "./product-offer.interface";

export interface Product {
  name: string;
  description: string;
  defaultUnit: Unit;
  kilocaloriesPerUnit: number;
}
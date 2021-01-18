import { Unit } from "../enums/unit.enum";

export interface Product {
  name: string;
  description: string;
  defaultUnit: Unit;
  kilocaloriesPerUnit: number;
}
import { Unit } from "../enums/unit.enum";

export class Product {
  name!: string;
  description!: string;
  defaultUnit!: Unit;
  kilocaloriesPerUnit!: number;
}
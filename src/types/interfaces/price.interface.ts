import { Currency } from "../enums/currency.enum";

export interface Price {
  value: number;
  currency: Currency;
}
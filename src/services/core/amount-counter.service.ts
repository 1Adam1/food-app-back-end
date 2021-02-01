import { Currency } from "../../types/enums/currency.enum";
import { Price } from "../../types/interfaces/price.interface";
import { ProductOffer } from "../../types/interfaces/product-offer.interface";

export class AmountService {
  static countTotalPrice(items: ProductOffer[]): Price | undefined {
    let currentCurrency;
    let sum = 0;
    
    for (let i = 0; i < items.length; i++) {
      const {value, currency } = items[i].price;

      if (!items[i].price) {
        return;
      }

      if (currentCurrency && currentCurrency !== currency) {
        throw new Error('Different currencies');
      } 
      currentCurrency = currency;

      sum += value;
    }

    return {
      value: sum,
      currency: currentCurrency as Currency
    };
  }
}
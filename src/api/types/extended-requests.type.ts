import { Request } from 'express';
import { Token } from '../../types/interfaces/token';
import { ConsumedMealsHistoryDayDataModelInterface } from '../../database/interfaces/consumed-meals-history-day.interface.model';
import { DietPlanDayDataModelInterface } from '../../database/interfaces/diet-plan-day.model.interface';
import { MealDataModelInterface } from '../../database/interfaces/meal.model.interface';
import { PersonDataModelInterface } from '../../database/interfaces/person.model.inteface';
import { PersonalProflieDataModelInterface } from '../../database/interfaces/personal-profile.interface';
import { ProductOfferDataModelInterface } from '../../database/interfaces/product-offer.model.interface';
import { ProductDataModelInterface } from '../../database/interfaces/product.model.interface';
import { ShopDataModelInterface } from '../../database/interfaces/shop.model.interface';
import { ShoppingListDataModelInterface } from '../../database/interfaces/shopping-list.model.interface';
import { UserDataModelInterface } from '../../database/interfaces/user-data.model.interface';

interface ExtendedData {
  extendedData?: {
    user?: UserDataModelInterface;
    token?: Token;
    shop?: ShopDataModelInterface;
    product?: ProductDataModelInterface;
    productOffer?: ProductOfferDataModelInterface;
    meal?: MealDataModelInterface;
    mealsProducts?: ProductDataModelInterface[];
    shoppingList?: ShoppingListDataModelInterface;
    shoppingListItems?: ProductOfferDataModelInterface[];
    person?: PersonDataModelInterface;
    personalProfile?: PersonalProflieDataModelInterface;
    consumedMealsHistoryDay?: ConsumedMealsHistoryDayDataModelInterface;
    consumedMeals?: MealDataModelInterface[];
    mealsToConsume?: MealDataModelInterface[];
    dietPlanDay?: DietPlanDayDataModelInterface;
  }; 
}

export type ExtendedRequestType = ExtendedData & Request;
import { Request } from 'express';
import { Token } from '../../types/interfaces/token';
import { ConsumedMealsHistoryDayDataModelInterface } from '../interfaces/consumed-meals-history-day.interface.model';
import { DietPlanDayModelInterface } from '../interfaces/diet-plan-day.model.interface';
import { MealDataModelInterface } from '../interfaces/meal.model.interface';
import { PersonDataModelInterface } from '../interfaces/person.model.inteface';
import { PersonalProflieDataModelInterface } from '../interfaces/personal-profile.interface';
import { ProductOfferDataModelInterface } from '../interfaces/product-offer.model.interface';
import { ProductDataModelInterface } from '../interfaces/product.model.interface';
import { ShopDataModelInterface } from '../interfaces/shop.model.interface';
import { ShoppingListDataModelInterface } from '../interfaces/shopping-list.model.interface';
import { UserDataModelInterface } from '../interfaces/user-data.model.interface';

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
    consumedMealsHistoryDays?: ConsumedMealsHistoryDayDataModelInterface[];
    dietPlanDay?: DietPlanDayModelInterface;
    dietPlanDays?: DietPlanDayModelInterface[];
  }; 
}

export type ExtendedRequestType = ExtendedData & Request;
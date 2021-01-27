import { Document } from 'mongoose';
import { ShoppingList } from '../../types/interfaces/shopping-list.interface';

export interface ShoppingListDataModelInterface extends Document, ShoppingList {
}

export interface ShoppingListDataModelIdexableInterface extends ShoppingListDataModelInterface {
  [key: string]: any;
}
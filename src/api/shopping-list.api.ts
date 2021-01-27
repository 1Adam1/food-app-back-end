import { Router, Response } from "express";
import ShoppingList from "../database/models/shopping-list";
import { ExtendedRequestType } from "../database/types/extended-requests.type";
import { AuthenticationService } from "../services/authentication/authentication.service";
import { ShoppingListAuthorizationService } from "../services/autorization/shopping-list.authorization.service";
import { Currency } from "../types/enums/currency.enum";

const router = Router();

router.post('/shopping-lists', 
  AuthenticationService.authenticateUser,
  ShoppingListAuthorizationService.authorizeShoppingListsItems,
  async (request: ExtendedRequestType, response: Response) => 
  {
    try {
      const maintainer = request.extendedData!.user!._id;
      const extendedBody = { ...request.body, maintainer };
      
      extendedBody.totalAmount = {
        value: 0,
        currency: Currency.PLN
      };

      extendedBody.partialAmount = {
        value: 0,
        currency: Currency.PLN
      };

      const shoppingList = new ShoppingList(extendedBody);
      await shoppingList.save();

      response.status(201).send(shoppingList.toJSON());
    } catch (error) {
      response.status(400).send(error);
    }
  }
);

export default router;
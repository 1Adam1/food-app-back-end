import { Router, Response } from "express";
import { ShoppingListDataModelIdexableInterface } from "../database/interfaces/shopping-list.model.interface";
import ShoppingList from "../database/models/shopping-list";
import { ExtendedRequestType } from "../database/types/extended-requests.type";
import { AuthenticationService } from "../services/authentication/authentication.service";
import { ShoppingListAuthorizationService } from "../services/autorization/shopping-list-authorization.service";
import { AmountService } from "../services/core/amount-counter.service";

const router = Router();

router.post('/shopping-lists', 
  AuthenticationService.authenticateUser,
  ShoppingListAuthorizationService.authorizeShoppingListsItems,
  async (request: ExtendedRequestType, response: Response) => 
  {
    try {
      const maintainer = request.extendedData!.user!._id;
      const extendedBody = { ...request.body, maintainer };
      
      extendedBody.totalPrice = AmountService.countTotalPrice(request.extendedData!.shoppingListItems!);

      const shoppingList = new ShoppingList(extendedBody);
      await shoppingList.save();

      response.status(201).send(shoppingList);
    } catch (error) {
      response.status(400).send(error);
    }
  }
);

router.get('/shopping-lists/:shoppingListId',
  AuthenticationService.authenticateUser,
  ShoppingListAuthorizationService.authorizateShoppingList,
  async (request: ExtendedRequestType, response: Response) => {
    try {
      response.send(request.extendedData!.shoppingList);
    } catch (error) {
      response.status(400).send(error);
    }
  }
);

router.patch('/shopping-lists/:shoppingListId',
  AuthenticationService.authenticateUser,
  ShoppingListAuthorizationService.authorizateShoppingList,
  ShoppingListAuthorizationService.authorizeShoppingListsItems,
  async (request: ExtendedRequestType, response: Response) => {
    const allowedFieldsKeys = ['date', 'description', 'items'];
    const bodyFieldKeys = Object.keys(request.body);
    const operationIsValid = bodyFieldKeys.every(key => allowedFieldsKeys.includes(key));
  
    if (!operationIsValid) {
      return response.status(400).send({error: 'Invalid updates'});
    }

    try {
      bodyFieldKeys.forEach(key => (request.extendedData!.shoppingList as ShoppingListDataModelIdexableInterface)[key] = request.body[key]);
      request.extendedData!.shoppingList!.totalPrice = AmountService.countTotalPrice(request.extendedData!.shoppingListItems!);
      await request.extendedData!.shoppingList!.save();
  
      response.send(request.extendedData!.shoppingList!);
    } catch (error) {
      response.status(400).send();
    }
  }
);

router.delete('/shopping-lists/:shoppingListId',
  AuthenticationService.authenticateUser,
  ShoppingListAuthorizationService.authorizateShoppingList,
  async (request: ExtendedRequestType, response: Response) => {
    try {
      await request.extendedData!.shoppingList!.remove();
      response.send();
    } catch (error) {
      response.status(500).send();
    }
  }
);

export default router;
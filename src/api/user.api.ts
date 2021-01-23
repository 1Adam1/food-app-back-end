import {Router, Response, Request} from 'express';
import { Model } from 'mongoose';
import { UserDataModelIdexableInterface } from '../database-models/interfaces/user-data.model.interface';
import Meal from '../database-models/meal';
import Person from '../database-models/person';
import Product from '../database-models/product';
import Shop from '../database-models/shop';
import ShoppingList from '../database-models/shopping-list';
import { ExtendedRequestType } from '../database-models/types/extended-requests.type';
import UserModel from '../database-models/user';
import { AuthenticationService } from '../services/authentication/authentication.service';

const router = Router();

router.post('/users', async (request: Request, response: Response) => {
  const user = new UserModel(request.body);

  try {
    const result = await user.save();
    const token = await user.generateToken();

    response.status(201).send({
      user: result ,
      token
    });
  } catch (error) {
    response.status(400).send(error);
  }
});

router.post('/users/login', async (request: ExtendedRequestType, response: Response) => {
  try {
    const user = await UserModel.findByCredentials(request.body.login, request.body.password);
    const token = await user.generateToken();

    response.send({user, token});
  } catch (error) {
    response.status(400).send({error});
  }
});

router.post('/users/logout', AuthenticationService.authenticateUser, async (request: ExtendedRequestType, response: Response) => {
  try {
    const user = request.extendedData!.user!;
    const token = request.extendedData!.token!;

    user.tokens = user.tokens.filter(checkedToken => checkedToken.token !== token.token);
    await user.save();

    response.send();
  } catch (error) {
    response.status(500).send();
  }
});

router.post('/users/logoutAll', AuthenticationService.authenticateUser, async (request: ExtendedRequestType, response: Response) => {
  try {
    const user = request.extendedData!.user!;

    user.tokens = [];
    await user.save();

    response.send();
  } catch (error) {
    response.status(500).send();
  }
});

router.get('/users/me', AuthenticationService.authenticateUser, (request: ExtendedRequestType, response: Response) => {
  response.send(request.extendedData);
});

router.patch('/users/me', AuthenticationService.authenticateUser, async (request: ExtendedRequestType, response: Response) => {
  const allowedFieldsKeys = ['name', 'surname', 'description', 'password'];
  const bodyFieldKeys = Object.keys(request.body);
  const operationIsValid = bodyFieldKeys.every(key => allowedFieldsKeys.includes(key));
  
  if (!operationIsValid) {
    return response.status(400).send({error: 'Invalid updates'});
  }

  try {
    const user = request.extendedData!.user!;
    const token = request.extendedData!.token!;
    
    bodyFieldKeys.forEach(key => (user as UserDataModelIdexableInterface)[key] = request.body[key]);
    await user.save();

    response.send({
      user,
      token
    });
  } catch (error) {
    response.status(400).send();
  }
});

router.delete('/users/me', AuthenticationService.authenticateUser, async (request: ExtendedRequestType, response: Response) => {
  try {
    await request.extendedData!.user!.remove();

    response.send();
  } catch (error) {
    response.status(500).send();
  }
});

const getAllModelDataMaintainedByUser = async (path: string, request: ExtendedRequestType, response: Response) => {
  try {
    const user = request.extendedData!.user;
    const results = await user!.populate({path}).execPopulate() as any;

    response.send(results[path]);
  } catch (error) {
    response.status(500).send();
  }
}

router.get('/users/me/shops', AuthenticationService.authenticateUser, async (request: ExtendedRequestType, response: Response) => {
  await getAllModelDataMaintainedByUser('shops', request, response);
});

router.get('/users/me/products', AuthenticationService.authenticateUser, async (request: ExtendedRequestType, response: Response) => {
  await getAllModelDataMaintainedByUser('products', request, response);
});

router.get('/users/me/people', AuthenticationService.authenticateUser, async (request: ExtendedRequestType, response: Response) => {
  await getAllModelDataMaintainedByUser('people', request, response);
});

router.get('/users/me/meals', AuthenticationService.authenticateUser, async (request: ExtendedRequestType, response: Response) => {
  await getAllModelDataMaintainedByUser('meals', request, response);
});

router.get('/users/me/shopping-lists', AuthenticationService.authenticateUser, async (request: ExtendedRequestType, response: Response) => {
  await getAllModelDataMaintainedByUser('shoppingLists', request, response);
});

export default router;
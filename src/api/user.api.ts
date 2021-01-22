import {Router, Response, Request} from 'express';
import { UserDataModelIdexableInterface } from '../database-models/interfaces/user-data.model.interface';
import { ExtendedRequestWithUserDataType } from '../database-models/types/extended-request-with-user-data.type';
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

router.post('/users/login', async (request: ExtendedRequestWithUserDataType, response: Response) => {
  try {
    const user = await UserModel.findByCredentials(request.body.login, request.body.password);
    const token = await user.generateToken();

    response.send({user, token});
  } catch (error) {
    response.status(400).send({error});
  }
});

router.post('/users/logout', AuthenticationService.authenticateUser, async (request: ExtendedRequestWithUserDataType, response: Response) => {
  try {
    const {user, token} = request.extendedData!;

    user.tokens = user.tokens.filter(checkedToken => checkedToken.token !== token.token);
    await user.save();

    response.send();
  } catch (error) {
    response.status(500).send();
  }
});

router.post('/users/logoutAll', AuthenticationService.authenticateUser, async (request: ExtendedRequestWithUserDataType, response: Response) => {
  try {
    const user = request.extendedData!.user;

    user.tokens = [];
    await user.save();

    response.send();
  } catch (error) {
    response.status(500).send();
  }
});

router.get('/users/me', AuthenticationService.authenticateUser, (request: ExtendedRequestWithUserDataType, response: Response) => {
  response.send(request.extendedData);
});

router.patch('/users/me', AuthenticationService.authenticateUser, async (request: ExtendedRequestWithUserDataType, response: Response) => {
  const allowedFieldsKeys = ['name', 'surname', 'description', 'password'];
  const bodyFieldKeys = Object.keys(request.body);
  const operationIsValid = bodyFieldKeys.every(key => allowedFieldsKeys.includes(key));
  
  if (!operationIsValid) {
    return response.status(400).send({error: 'Invalid updates'});
  }

  try {
    bodyFieldKeys.forEach(key => (request.extendedData!.user as UserDataModelIdexableInterface)[key] = request.body[key]);
    await request.extendedData!.user.save();

    response.send(request.extendedData);
  } catch (error) {
    response.status(400).send();
  }
});

export default router;
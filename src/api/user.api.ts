import {Router, Response, Request} from 'express';
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

router.get('/users/me', AuthenticationService.authenticateUser, (request: ExtendedRequestWithUserDataType, response: Response) => {
  response.send(request.extendedData);
});

export default router;
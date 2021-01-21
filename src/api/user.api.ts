import {Router, Response, Request} from 'express';
import { ExtendedRequestWithUserDataType } from '../database-models/types/extended-request-with-user-data.type';
import UserModel from '../database-models/user';
import { AuthenticationService } from '../services/authentication/authentication.service';

const router = Router();

router.post('/users', async (request: Request, response: Response) => {
  const user = new UserModel(request.body);

  try {
    const result = await user.save();
    const token = AuthenticationService.generateAuthenticationToken(result._id.toString());

    user.tokens = user.tokens.concat({token});
    await user.save();

    response.status(201).send({
      user: result 
    });
  } catch (error) {
    response.status(400).send(error);
  }
});

// router.post('');

router.get('/users/me', AuthenticationService.authenticateUser, async (request: ExtendedRequestWithUserDataType, response: Response) => {
  console.log('test', request);
  response.send(request.extendedData);
});

export default router;
import {Router, Response, Request} from 'express';
import UserModel from '../database-models/user';

const router = Router();

router.post('/users', async (request: Request, response: Response) => {
  const user = new UserModel(request.body);

  try {
    const result = await user.save();

    response.status(201).send({
      user: result 
    });
  } catch (error) {
    response.status(400).send(error);
  }
});

export default router;
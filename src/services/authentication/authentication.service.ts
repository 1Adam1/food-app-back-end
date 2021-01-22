import {Response, NextFunction} from 'express';
import User from '../../database-models/user';
import jsonwebtoken from 'jsonwebtoken';
import { TokenModelInterface } from '../../database-models/interfaces/token.model.interface';
import { ExtendedRequestType } from '../../database-models/types/extended-requests.type';

export class AuthenticationService {
  static async authenticateUser(request: ExtendedRequestType, response: Response, next: NextFunction) {   
    AuthenticationService.checkJWTSecret();
    
    try {
      const token = request.header('Authorization')?.replace('Bearer ', '');

      if (!token) {
        throw new Error();
      }
      
      const decodedToken = jsonwebtoken.verify(token, process.env.JWT_SECRET!) as TokenModelInterface;
      
      const user = await User.findOne({_id: decodedToken._id, 'tokens.token': token});
      
      if (!user) {
        throw new Error();
      }
      
      request.extendedData = {user, token: {token}};
      next();
    } catch (error) {
      response.status(401).send({error: 'Please authenticate'});
    }
  }

  private static checkJWTSecret() {
    if (!process.env.JWT_SECRET) {
      throw new Error('Data for authentication are not properly configured');
    }
  }

  static generateAuthenticationToken(userId: string) {
    return jsonwebtoken.sign({_id: userId}, process.env.JWT_SECRET!);
  }
}
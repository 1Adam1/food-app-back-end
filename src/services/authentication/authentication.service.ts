import {Response, NextFunction} from 'express';
import User from '../../database-models/user';
import jsonwebtoken from 'jsonwebtoken';
import { TokenModelInterface } from '../../database-models/interfaces/token.model.interface';
import { ExtendedRequestWithUserDataType } from '../../database-models/types/extended-request-with-user-data.type';

export class AuthenticationService {
  static async authenticateUser(request: ExtendedRequestWithUserDataType, response: Response, next: NextFunction) {   
    this.checkJWTSecret();
    
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

      request.user = user;
      request.token = {token};
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
    return jsonwebtoken.sign({userId: userId}, process.env.JWT_SECRET!);
  }
}
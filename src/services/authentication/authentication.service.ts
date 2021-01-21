import {Request, Response, NextFunction} from 'express';
import jsonwebtoken from 'jsonwebtoken';

export class AuthenticationService {
  static async authenticateUser(request: Request, response: Response, next: NextFunction) {   
    try {

    } catch (error) {
      
    }
  }

  static generateAuthenticationToken(userId: string): string {
    if (!process.env.JWT_SECRET) {
      throw new Error('Data for authentication are not properly configured');
    }

    return jsonwebtoken.sign({_id: userId}, process.env.JWT_SECRET);
  }
}
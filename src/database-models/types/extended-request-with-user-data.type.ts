import { Request } from 'express';
import { Token } from '../../types/interfaces/token';
import { UserDataModelInterface } from '../interfaces/user-data.model.interface';

class ExtendedData {
  extendedData?: {
    user: UserDataModelInterface;
    token: Token;
  };
}

export type ExtendedRequestWithUserDataType = ExtendedData & Request;
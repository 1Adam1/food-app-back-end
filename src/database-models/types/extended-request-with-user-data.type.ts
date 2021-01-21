import { Request } from 'express';
import { Token } from '../../types/interfaces/token';
import { UserData } from '../../types/interfaces/user-data.interface';

class ExtendedData {
  extendedData?: {
    user: UserData;
    token: Token;
  };
}

export type ExtendedRequestWithUserDataType = ExtendedData & Request;
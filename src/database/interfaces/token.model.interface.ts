import { Document } from 'mongoose';
import { Token } from '../../types/interfaces/token';

export interface TokenModelInterface extends Document, Token {
  
}
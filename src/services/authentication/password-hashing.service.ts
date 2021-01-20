import bcrypt from 'bcrypt';

export class PasswordHashingService {
  static async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 8);
  }
}
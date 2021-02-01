import bcrypt from 'bcrypt';

export class PasswordHashingService {
  static async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 8);
  }

  static async matchPasswords(requestPassword: string, passwordHash: string): Promise<boolean> {
    return await bcrypt.compare(requestPassword, passwordHash);
  }
}
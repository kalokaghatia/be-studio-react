import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private usersRepo: UsersRepository) { }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepo.findByEmail(email);
  }

  async createUser(email: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.usersRepo.create({ email, password: hashedPassword });
  }

  async deleteUser(email: string): Promise<User | null> {
    return this.usersRepo.deleteByEmail(email);
  }

  async setRefreshToken(userId: string, refreshToken: string) {
    return this.usersRepo.setRefreshToken(userId, refreshToken);
  }

  async getUserByRefreshToken(refreshToken: string) {
    return this.usersRepo.getUserByRefreshToken(refreshToken);
  }

  async removeRefreshToken(userId: string) {
    return this.usersRepo.removeRefreshToken(userId);
  }
}

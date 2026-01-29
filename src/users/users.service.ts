import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(private usersRepo: UsersRepository) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepo.findByEmail(email);
  }

  async createUser(email: string, password: string): Promise<User> {
    return this.usersRepo.create({ email, password });
  }

  async deleteUser(email: string): Promise<User | null> {
    return this.usersRepo.deleteByEmail(email);
  }
}

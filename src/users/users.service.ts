import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private usersRepo: UsersRepository) {}

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
  
}

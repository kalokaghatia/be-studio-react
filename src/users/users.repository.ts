import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async create(user: Partial<User>): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }
  
  async deleteByEmail(email: string): Promise<User | null> {
    return this.userModel.findOneAndDelete({ email }).exec();
  }

    async setRefreshToken(userId: string, refreshToken: string) {
    const hashed = await bcrypt.hash(refreshToken, 10);
    return this.userModel.findByIdAndUpdate(userId, { refreshToken: hashed });
  }

  async getUserByRefreshToken(refreshToken: string): Promise<User | null> {
    const users = await this.userModel.find().exec();
    for (const user of users) {
      if (user.refreshToken && (await bcrypt.compare(refreshToken, user.refreshToken))) {
        return user;
      }
    }
    return null;
  }

  async removeRefreshToken(userId: string) {
    return this.userModel.findByIdAndUpdate(userId, { refreshToken: null });
  }
}

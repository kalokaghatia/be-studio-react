import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return { message: 'Endpoint protetto!', user: req.user };
  }
  
  @Get('findByEmail')
  async findByEmail(@Query('email') email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Post('register')
  async createUser(@Body() userData: any) {
    return this.usersService.createUser(userData.email, userData.password);
  }

  @Delete('delete/:email')
  async deleteUser(@Param('email') email: string) {
    const deletedUser = await this.usersService.deleteUser(email);
    if (!deletedUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return { data: deletedUser, message: 'User deleted' };
  }
}

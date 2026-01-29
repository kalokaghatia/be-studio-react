import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get('findByemail')
    async findByEmail(@Body() email : string) {
        return this.usersService.findByEmail(email); 
    }

    @Post('register')
    async createUser(@Body() userData: any) {
        return this.usersService.createUser(userData.email, userData.password);
    }
}

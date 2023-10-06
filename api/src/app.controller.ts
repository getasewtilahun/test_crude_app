import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';

@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
  ) {}
  

  @Post('user')
  async createUser(
    @Body() userData: { name?: string; email: string,password?: string, phone_number?: string },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Get('user')
  async getAllUsers(@Param('id') id: string): Promise<UserModel[]> {
    return this.userService.users({});
  }
 
}
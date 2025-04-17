import {
  Controller,
  Get,
  Req,
  Param,
  UseInterceptors,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';

import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { User } from './user.schema';
import { SerializeInterceptor } from './interceptors/serialize.interceptor';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseInterceptors(new SerializeInterceptor(UserDto))
  @Get()
  async listUsers(): Promise<User[]> {
    return await this.userService.findAll();
  }
}

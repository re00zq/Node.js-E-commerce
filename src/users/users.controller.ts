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
import { User } from './user.schema';
import { SerializeInterceptor } from '../common/interceptors/serialize.interceptor';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { listUsersService } from './services/litsUsers.service';

@Controller('users')
export class UsersController {
  constructor(private listUsers: listUsersService) {}

  @UseGuards(AccessTokenGuard, RolesGuard)
  @UseInterceptors(new SerializeInterceptor(UserDto))
  @Get()
  async findAll(): Promise<User[]> {
    return await this.listUsers.findAll();
  }
}

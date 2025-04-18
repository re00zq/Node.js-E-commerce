import { Controller, Get, UseInterceptors, UseGuards } from '@nestjs/common';

import { UserDto } from './dto/user.dto';
import { User } from './user.schema';
import { SerializeInterceptor } from '../common/interceptors/serialize.interceptor';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { listUsersService } from './services/litsUsers.service';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private listUsers: listUsersService) {}

  @Roles(['admin'])
  @UseGuards(AccessTokenGuard, RolesGuard)
  @UseInterceptors(new SerializeInterceptor(UserDto))
  @Get()
  async findAll(): Promise<User[]> {
    return await this.listUsers.findAll();
  }
}

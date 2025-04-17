import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UserSchema, User } from './user.schema';
import { CreateUserService } from './services/createUser.service';
import { DeleteUserService } from './services/deleteUser.service';
import { FindUserService } from './services/findUser.service';
import { listUsersService } from './services/litsUsers.service';
import { UpdateUserService } from './services/updateUser.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [
    CreateUserService,
    DeleteUserService,
    FindUserService,
    listUsersService,
    UpdateUserService,
  ],
  exports: [
    CreateUserService,
    DeleteUserService,
    FindUserService,
    listUsersService,
    UpdateUserService,
  ],
})
export class UsersModule {}

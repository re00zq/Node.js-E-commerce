import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user.schema';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class listUsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly i18n: I18nService,
  ) {}

  async findAll(): Promise<User[]> {
    const users: User[] = await this.userModel.find();
    if (users.length === 0)
      throw new NotFoundException(this.i18n.t('users.NO_USERS'));
    return users;
  }
}

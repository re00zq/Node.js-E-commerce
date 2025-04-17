import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../user.schema';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class FindUserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly i18n: I18nService,
  ) {}

  async findOne(query: object): Promise<UserDocument | null> {
    const user: UserDocument | null = await this.userModel
      .findOne(query)
      .exec();
    if (!user) throw new NotFoundException(this.i18n.t('users.USER_NF'));
    return user;
  }
}

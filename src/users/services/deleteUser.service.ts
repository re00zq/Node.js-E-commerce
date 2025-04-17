import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../user.schema';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class DeleteUserService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
    private readonly i18n: I18nService,
  ) {}

  async delete(id: string): Promise<void> {
    const result = await this.UserModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(this.i18n.t('users.USER_NF'));
    }
  }
}

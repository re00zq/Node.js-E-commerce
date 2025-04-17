import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user.schema';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class UpdateUserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly i18n: I18nService,
  ) {}
  async update(id: string, updateUserDto: Partial<User>): Promise<User> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(
        id,
        { $set: updateUserDto },
        { new: true, runValidators: true },
      )
      .exec();
    if (!updatedUser) {
      throw new NotFoundException(this.i18n.t('users.USER_ID_NF'));
    }
    return updatedUser;
  }
}

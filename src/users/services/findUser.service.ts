import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../user.schema';

@Injectable()
export class FindUserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOne(query: object): Promise<UserDocument | null> {
    const user: UserDocument | null = await this.userModel
      .findOne(query)
      .exec();
    return user;
  }
}

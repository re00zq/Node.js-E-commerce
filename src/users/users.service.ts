import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, UpdateResult } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly i18n: I18nService,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findOne(query: object): Promise<UserDocument | null> {
    const user: UserDocument | null = await this.userModel
      .findOne(query)
      .exec();
    if (!user) return null;
    return user;
  }

  async create(createUserDTO: RegisterDto): Promise<UserDocument> {
    const newUser = new this.userModel(createUserDTO);
    return newUser.save();
  }

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

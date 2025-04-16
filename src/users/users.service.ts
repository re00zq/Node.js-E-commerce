import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, UpdateResult } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { RegisterDto } from 'src/DTOs/register.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

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
    const updatedCat = await this.userModel
      .findByIdAndUpdate(
        id,
        { $set: updateUserDto },
        { new: true, runValidators: true },
      )
      .exec();
    if (!updatedCat) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
    return updatedCat;
  }
}

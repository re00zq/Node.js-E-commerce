import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../user.schema';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Injectable()
export class CreateUserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDTO: RegisterDto): Promise<UserDocument> {
    const newUser = new this.userModel(createUserDTO);
    return newUser.save();
  }
}

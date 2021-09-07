import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CreateUserDto} from './dto/createUserDto';
import {User} from './entities/user.entity';
import {Profile} from '../profile/entities/profile.entity';

import * as bcrypt from 'bcrypt';
import {Err} from '../error';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {
  }

  async findUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.findUserByEmail(createUserDto.email);

    if (user) throw new BadRequestException(Err.EXISTING_USER);

    const hashedPassword = await bcrypt.hash(createUserDto.password, 12);

    const createdUser = await this.userRepository.save({
      password: hashedPassword,
      email: createUserDto.email,
    });

    await this.profileRepository.save({
      nickname: createUserDto.nickname,
      birthday: createUserDto.birthday,
      userId: createdUser.id,
    });

    delete createdUser.password;
    return createdUser;
  }

  async getAllUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUser(userId: number): Promise<User> {
    return this.userRepository.findOne(userId);
  }

  async updateUser(userId: number, updateUserDto): Promise<void> {
    await this.userRepository.update(userId, updateUserDto);
  }

  async deleteUser(userId: number): Promise<void> {
    await this.userRepository.delete(userId);
  }
}

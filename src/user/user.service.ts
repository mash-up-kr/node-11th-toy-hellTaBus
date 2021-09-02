import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CreateUserDto} from './dto/createUserDto';
import {User} from './entities/user.entity';
import { Profile } from '../profile/entities/profile.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const userData = await this.userRepository.save({
      password: createUserDto.password,
      email: createUserDto.email,
    });

    await this.profileRepository.save({
      nickname: createUserDto.nickname,
      birthday: createUserDto.birthday,
      userId: userData.id,
    })

    delete userData.password;
    return userData;
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

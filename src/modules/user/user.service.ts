import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CreateUserDto} from './dto/create-user.dto';
import {User} from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const userData = await this.userRepository.save({
      id: createUserDto.id,
      password: createUserDto.password,
      nickname: createUserDto.nickname,
      email: createUserDto.email,
      birthday: createUserDto.birthday,
    });

    delete userData.password;
    return userData;
  }

  async getAllUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUser(userId: number): Promise<User> {
    return this.userRepository.findOne(userId);
  }

  async deleteUser(userId: number): Promise<void> {
    await this.userRepository.delete(userId);
  }
}

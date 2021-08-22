import {Injectable} from '@nestjs/common';
import {getRepository} from 'typeorm';
import {CreateUserDto} from './dto/create-user.dto';
import {User} from './user.entity';

@Injectable()
export class UserService {
  createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.id = createUserDto.id;
    user.password = createUserDto.password;
    user.nickname = createUserDto.nickname;
    user.email = createUserDto.email;
    user.birthday = createUserDto.birthday;

    return getRepository(User).save(user);
  }

  async getAllUser(): Promise<User[]> {
    const users: User[] = await getRepository(User)
        .createQueryBuilder('user')
        .getMany();
    return users;
  }

  async getUser(userId: number): Promise<User> {
    const user: User = await getRepository(User)
        .createQueryBuilder('user')
        .where('user._id = :id', {id: userId})
        .getOne();
    return user;
  }

  async deleteUser(userId: number): Promise<void> {
    await getRepository(User)
        .createQueryBuilder('user')
        .where('user._id = :id', {id: userId})
        .delete()
        .execute();
  }
}

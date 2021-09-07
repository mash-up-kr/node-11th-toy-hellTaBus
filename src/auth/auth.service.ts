import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {JwtService} from '@nestjs/jwt';
import {User} from '../user/entities/user.entity';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private readonly jwtService: JwtService,
  ) {
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: {email},
    });

    const isSamePassword = await bcrypt.compare(pass, user.password);
    if (isSamePassword) {
      const {...userWithoutPassword} = user;
      return userWithoutPassword;
    }

    return null;
  }

  async login(user: any) {
    const payload = {email: user.email, sub: user.id};

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}

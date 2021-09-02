import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './entities/user.entity';
import {UserController} from './user.controller';
import {UserService} from './user.service';
import {Profile} from '../profile/entities/profile.entity';
import {AuthService} from '../auth/auth.service';
import {AuthModule} from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile]),
    AuthModule],
  providers: [UserService, AuthService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {
}

import {forwardRef, Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {jwtConstants} from './constant';
import {JwtStrategy} from './jwt.strategy';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from '../user/entities/user.entity';
import {LocalStrategy} from './local.strategy';
import {UserModule} from '../user/user.module';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '2h'},
    }),
    forwardRef(() => UserModule),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}

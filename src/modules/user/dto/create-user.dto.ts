import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsString} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({example: 'ujusy', description: '사용자 아이디'})
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({example: '1234', description: '사용자 비밀번호'})
  password: string;

  @ApiProperty({description: '사용자 닉네임'})
  nickname: string;

  @IsEmail()
  @ApiProperty({description: '사용자 email'})
  email: string;

  @ApiProperty({description: '사용자 핸드폰 번호'})
  birthday: Date;
}

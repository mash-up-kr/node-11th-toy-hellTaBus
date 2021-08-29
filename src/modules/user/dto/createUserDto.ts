import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsString} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({example: 'ujusy', description: '사용자 아이디'})
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({example: '1234', description: '사용자 비밀번호'})
  password: string;

  @IsNotEmpty()
  @ApiProperty({example: '펭귄', description: '사용자 닉네임'})
  nickname: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({example: 'test@gmail.com', description: '사용자 email'})
  email: string;

  @IsNotEmpty()
  @ApiProperty({example: '1994-10-21', description: '사용자 생일'})
  birthday: Date;
}

import {ApiProperty} from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({description: '사용자 아이디'})
  id: string;

  @ApiProperty({description: '사용자 비밀번호'})
  password: string;

  @ApiProperty({description: '사용자 닉네임'})
  nickname: string;

  @ApiProperty({description: '사용자 email'})
  email: string;

  @ApiProperty({description: '사용자 핸드폰 번호'})
  birthday: Date;
}

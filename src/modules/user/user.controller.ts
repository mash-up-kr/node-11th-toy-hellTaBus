import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {ApiCreatedResponse, ApiOperation, ApiTags} from '@nestjs/swagger';
import {CreateUserDto} from './dto/create-user.dto';
import {User} from './user.entity';
import {UserService} from './user.service';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  @ApiOperation({summary: '사용자 생성 API', description: '새로운 사용자를 생성합니다.'})
  @ApiCreatedResponse({description: '생성된 사용자의 모든 항목을 확인 할 수 있습니다.', type: User})
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  @ApiOperation({summary: '모든 사용자 조회', description: '모든 사용자 목록을 조회합니다.'})
  getAllUser(): Promise<User[]> {
    return this.usersService.getAllUser();
  }

  @Get(':id')
  @ApiOperation({summary: '특정 사용자 조회', description: '특정 id에 해당하는 사용자만 조회합니다.'})
  getUser(@Param('id') id: number): Promise<User> {
    return this.usersService.getUser(id);
  }

  @Delete(':id')
  @ApiOperation({summary: '사용자 삭제', description: '특정 id에 해당하는 사용자를 삭제합니다.'})
  deleteUser(@Param('id') id: number): Promise<void> {
    return this.usersService.deleteUser(id);
  }
}

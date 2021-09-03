import {applyDecorators, Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {CreateUserDto} from './dto/createUserDto';
import {UpdateUserDto} from './dto/updateUserDto';
import {ApiDocs} from './user.docs';
import {User} from './user.entity';
import {UserService} from './user.service';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  @ApiDocs.createUser('사용자 생성 API')
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  @ApiDocs.getAllUser('모든 사용자 조회')
  getAllUser(): Promise<User[]> {
    return this.usersService.getAllUser();
  }

  @Get(':id')
  @ApiDocs.getUser('특정 사용자 조회')
  getUser(@Param('id') id: number): Promise<User> {
    return this.usersService.getUser(id);
  }

  @Patch('/:id')
  @ApiDocs.updateUser('사용자 상세정보 수정')
  updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @ApiDocs.deleteUser('사용자 삭제')
  deleteUser(@Param('id') id: number): Promise<void> {
    return this.usersService.deleteUser(id);
  }
}

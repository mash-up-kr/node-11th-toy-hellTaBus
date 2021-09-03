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
  @ApiDocs.createUser()
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  @ApiDocs.getAllUser()
  getAllUser(): Promise<User[]> {
    return this.usersService.getAllUser();
  }

  @Get(':id')
  @ApiDocs.getUser()
  getUser(@Param('id') id: number): Promise<User> {
    return this.usersService.getUser(id);
  }

  @Patch('/:id')
  @ApiDocs.updateUser()
  updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @ApiDocs.deleteUser()
  deleteUser(@Param('id') id: number): Promise<void> {
    return this.usersService.deleteUser(id);
  }
}

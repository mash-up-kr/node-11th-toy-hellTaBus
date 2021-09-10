import { CreateUserDto } from './dto/createUserDto';
import { UpdateUserDto } from './dto/updateUserDto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { LocalAuthGuard } from '../auth/local-auth.guard';

@Controller('user')
@ApiTags('User')
export class UserController {
    constructor(
        private readonly usersService: UserService,
        private readonly authService: AuthService,
    ) {}

    @Post()
    @ApiOperation({ summary: '사용자 생성 API', description: '새로운 사용자를 생성합니다.' })
    @ApiCreatedResponse({
        description: '생성된 사용자의 모든 항목을 확인 할 수 있습니다.',
        type: CreateUserDto,
    })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.createUser(createUserDto);
    }

    @Get()
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiOperation({ summary: '모든 사용자 조회', description: '모든 사용자 목록을 조회합니다.' })
    getAllUser(): Promise<User[]> {
        return this.usersService.getAllUser();
    }

    @Get(':id')
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiOperation({
        summary: '특정 사용자 조회',
        description: '특정 id에 해당하는 사용자만 조회합니다.',
    })
    getUser(@Param('id') id: number): Promise<User> {
        return this.usersService.getUser(id);
    }

    @Patch('/:id')
    @ApiOperation({
        summary: '사용자 상세정보 수정',
        description: '특정 id에 해당하는 사용자의 상세정보를 수정합니다.',
    })
    @ApiCreatedResponse({
        description: '생성된 사용자의 모든 항목을 확인 할 수 있습니다.',
        type: UpdateUserDto,
    })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.updateUser(id, updateUserDto);
    }

    @Delete(':id')
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiOperation({
        summary: '사용자 삭제',
        description: '특정 id에 해당하는 사용자를 삭제합니다.',
    })
    deleteUser(@Param('id') id: number): Promise<void> {
        return this.usersService.deleteUser(id);
    }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Req() req) {
        return this.authService.login(req.user);
    }
}

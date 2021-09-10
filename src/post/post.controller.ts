import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Req,
    UseGuards,
    ParseIntPipe,
    Put,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiCreatedResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Post')
@Controller('post')
@UseGuards(JwtAuthGuard)
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Post()
    @ApiOperation({ summary: '게시물 생성', description: '새로운 게시물을 생성합니다.' })
    @ApiCreatedResponse({
        description: '생성된 게시물의 내용을 확인할 수 있습니다.',
        type: CreatePostDto,
    })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    create(@Req() req, @Body() body: CreatePostDto) {
        return this.postService.createPost(body.caption, req.user.id);
    }

    @Get(':id')
    @ApiParam({
        name: 'id',
        required: true,
        description: '게시물 Id',
    })
    @ApiOperation({
        summary: '게시물 조회',
        description: '특정 id에 해당하는 게시물을 조회합니다.',
    })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    getPost(@Param('id', ParseIntPipe) id: number) {
        return this.postService.getPost(id);
    }

    @Patch(':id')
    @ApiParam({
        name: 'id',
        required: true,
        description: '게시물 Id',
    })
    @ApiOperation({
        summary: '게시물 내용 수정',
        description: '특정 id에 해당하는 게시물을 수정합니다.',
    })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    updatePost(
        @Req() req,
        @Param('id', ParseIntPipe) id: number,
        @Body() updatePostDto: UpdatePostDto,
    ) {
        return this.postService.updatePost(id, updatePostDto, req.user.id);
    }

    @Delete(':id')
    @ApiParam({
        name: 'id',
        required: true,
        description: '게시물 Id',
    })
    @ApiOperation({
        summary: '게시물 내용 삭제',
        description: '특정 id에 해당하는 게시물을 삭제합니다.',
    })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    deletePost(@Req() req, @Param('id', ParseIntPipe) id: number) {
        return this.postService.deletePost(id, req.user.id);
    }

    @Put(':id/like')
    @ApiParam({
        name: 'id',
        required: true,
        description: '게시물 Id',
    })
    @ApiOperation({
        summary: '게시물 좋아요',
        description: '특정 id에 해당하는 게시물에 좋아요를 추가합니다.',
    })
    likePost(@Req() req, @Param('id', ParseIntPipe) id: number) {
        return this.postService.likePost(id, req.user.id);
    }

    @Delete(':id/dislike')
    @ApiParam({
        name: 'id',
        required: true,
        description: '게시물 Id',
    })
    @ApiOperation({
        summary: '게시물 좋아요 삭제',
        description: '특정 id에 해당하는 게시물에 좋아요를 삭제합니다.',
    })
    dislikePost(@Req() req, @Param('id', ParseIntPipe) id: number) {
        return this.postService.dislikePost(id, req.user.id);
    }
}

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
} from '@nestjs/common';
import {PostService} from './post.service';
import {CreatePostDto} from './dto/create-post.dto';
import {UpdatePostDto} from './dto/update-post.dto';
import {JwtAuthGuard} from 'src/auth/jwt-auth.guard';
import {ApiTags} from '@nestjs/swagger';
import {ApiDocs} from './post.docs';

@ApiTags('Post')
@Controller('post')
@UseGuards(JwtAuthGuard)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @ApiDocs.createPost('게시물 생성')
  createPost(@Req() req, @Body() body: CreatePostDto) {
    return this.postService.createPost(body.caption, req.user.id);
  }

  @Get(':id')
  @ApiDocs.getPost('게시물 조회')
  getPost(@Param('id', ParseIntPipe) id: number) {
    return this.postService.getPost(id);
  }

  @Patch(':id')
  @ApiDocs.updatePost('게시물 내용 수정')
  updatePost(
    @Req() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postService.updatePost(id, updatePostDto, req.user.id);
  }

  @Delete(':id')
  @ApiDocs.deletePost('게시물 내용 삭제')
  deletePost(@Req() req, @Param('id', ParseIntPipe) id: number) {
    return this.postService.deletePost(id, req.user.id);
  }

  @Post(':id/like')
  @ApiDocs.likePost('게시물 좋아요')
  likePost(@Req() req, @Param('id', ParseIntPipe) id: number) {
    return this.postService.likePost(id, req.user.id);
  }

  @Delete(':id/like')
  @ApiDocs.dislikePost('게시물 좋아요 삭제')
  dislikePost(@Req() req, @Param('id', ParseIntPipe) id: number) {
    return this.postService.dislikePost(id, req.user.id);
  }
}

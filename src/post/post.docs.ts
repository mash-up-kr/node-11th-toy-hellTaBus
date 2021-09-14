import {applyDecorators} from '@nestjs/common';
import {
  ApiCreatedResponse, ApiOperation, ApiResponse, ApiParam,
} from '@nestjs/swagger';
import {PostController} from './post.controller';
import {CreatePostDto} from './dto/create-post.dto';

type SwaggerMethodDoc<T> = {
    [K in keyof T]: (description: string) => MethodDecorator;
};

export const ApiDocs: SwaggerMethodDoc<PostController> = {
  createPost(summary) {
    return applyDecorators(
        ApiOperation({
          summary,
          description: '새로운 게시물을 생성합니다.',
        }),
        ApiCreatedResponse({
          description: '생성된 게시물의 내용을 확인할 수 있습니다.',
          type: CreatePostDto,
        }),
        ApiResponse({
          status: 401,
          description: 'Unauthorized',
        }),
    );
  },
  getPost(summary: string) {
    return applyDecorators(
        ApiResponse({status: 401, description: 'Unauthorized'}),
        ApiOperation({
          summary,
          description: '특정 id에 해당하는 게시물을 조회합니다.',
        }),
        ApiParam({
          name: 'id',
          required: true,
          description: '게시물 Id',
        }),
    );
  },
  updatePost(summary: string) {
    return applyDecorators(
        ApiResponse({status: 401, description: 'Unauthorized'}),
        ApiOperation({
          summary,
          description: '특정 id에 해당하는 게시물을 수정합니다.',
        }),
        ApiParam({
          name: 'id',
          required: true,
          description: '게시물 Id',
        }),
    );
  },
  deletePost(summary: string) {
    return applyDecorators(
        ApiOperation({
          summary,
          description: '특정 id에 해당하는 게시물을 삭제합니다.',
        }),
        ApiResponse({status: 401, description: 'Unauthorized'}),
        ApiParam({
          name: 'id',
          required: true,
          description: '게시물 Id',
        }),
    );
  },
  likePost(summary: string) {
    return applyDecorators(
        ApiOperation({
          summary,
          description: '특정 id에 해당하는 게시물에 좋아요를 생성합니다.',
        }),
        ApiParam({
          name: 'id',
          required: true,
          description: '게시물 Id',
        }),
    );
  },
  dislikePost(summary: string) {
    return applyDecorators(
        ApiOperation({
          summary,
          description: '특정 id에 해당하는 게시물에 좋아요를 삭제합니다.',
        }),
        ApiParam({
          name: 'id',
          required: true,
          description: '게시물 Id',
        }),
    );
  },
};

import {applyDecorators} from '@nestjs/common';
import {ApiCreatedResponse, ApiOperation, ApiResponse} from '@nestjs/swagger';
import {CreateUserDto} from './dto/createUserDto';
import {UpdateUserDto} from './dto/updateUserDto';
import {UserController} from './user.controller';

type SwaggerMethodDoc<T> = {
  [K in keyof T]: (description: string) => MethodDecorator;
};

// TODO: 재검토 필요 (Response DTO 정의? + 전체적으로 점검)
export const ApiDocs: SwaggerMethodDoc<UserController> = {
  createUser(summary) {
    return applyDecorators(
        ApiOperation({
          summary, // '사용자 생성 API',
          description: '새로운 사용자를 생성합니다.',
        }),
        ApiCreatedResponse({
          description: '생성된 사용자의 모든 항목을 확인 할 수 있습니다.',
          type: CreateUserDto,
        }),
        ApiResponse({
          status: 201,
          description: 'The record has been successfully created.',
        }),
        ApiResponse({status: 403, description: 'Forbidden.'}),
    );
  },
  getAllUser(summary: string) {
    return applyDecorators(
        ApiResponse({status: 403, description: 'Forbidden.'}),
        ApiOperation({
          summary,
          /** '모든 사용자 조회' */ description: '모든 사용자 목록을 조회합니다.',
        }),
    );
  },
  getUser(summary: string) {
    return applyDecorators(
        ApiResponse({status: 403, description: 'Forbidden.'}),
        ApiOperation({
          summary,
          description: '특정 id에 해당하는 사용자만 조회합니다.',
        }),
    );
  },
  updateUser(summary: string) {
    return applyDecorators(
        ApiOperation({
          summary,
          description: '특정 id에 해당하는 사용자의 상세정보를 수정합니다.',
        }),
        ApiCreatedResponse({
          description: '생성된 사용자의 모든 항목을 확인 할 수 있습니다.',
          type: UpdateUserDto,
        }),
        ApiResponse({
          status: 201,
          description: 'The record has been successfully created.',
        }),
        ApiResponse({status: 403, description: 'Forbidden.'}),
    );
  },
  deleteUser(summary: string) {
    return applyDecorators(
        ApiResponse({status: 403, description: 'Forbidden.'}),
        ApiOperation({
          summary,
          description: '특정 id에 해당하는 사용자를 삭제합니다.',
        }),
    );
  },
  login(summary: string) {
    return applyDecorators(
        ApiResponse({status: 403, description: 'Forbidden.'}),
        ApiOperation({
          summary,
          description: '로그인합니다.',
        }),
    );
  },
};

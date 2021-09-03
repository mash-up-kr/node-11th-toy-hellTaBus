import {applyDecorators} from '@nestjs/common';
import {ApiCreatedResponse, ApiOperation, ApiResponse} from '@nestjs/swagger';
import {CreateUserDto} from './dto/createUserDto';
import {UpdateUserDto} from './dto/updateUserDto';

export const ApiDocs = {
  createUser: () =>
    applyDecorators(
      ApiOperation({
        summary: '사용자 생성 API',
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
    ),

  getAllUser: () =>
    applyDecorators(
      ApiResponse({status: 403, description: 'Forbidden.'}),
      ApiOperation({summary: '모든 사용자 조회', description: '모든 사용자 목록을 조회합니다.'}),
    ),

  getUser: () =>
    applyDecorators(
      ApiResponse({status: 403, description: 'Forbidden.'}),
      ApiOperation({
        summary: '특정 사용자 조회',
        description: '특정 id에 해당하는 사용자만 조회합니다.',
      }),
    ),

  updateUser: () =>
    applyDecorators(
      ApiOperation({
        summary: '사용자 상세정보 수정',
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
    ),

  deleteUser: () =>
    applyDecorators(
      ApiResponse({status: 403, description: 'Forbidden.'}),
      ApiOperation({
        summary: '사용자 삭제',
        description: '특정 id에 해당하는 사용자를 삭제합니다.',
      }),
    ),
};

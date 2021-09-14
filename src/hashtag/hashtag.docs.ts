import {applyDecorators} from '@nestjs/common';
import {ApiOperation, ApiParam} from '@nestjs/swagger';
import {HashtagController} from './hashtag.controller';

type SwaggerMethodDoc<T> = {
    [K in keyof T]: (description: string) => MethodDecorator;
};

export const ApiDocs: SwaggerMethodDoc<HashtagController> = {
  findHashtag(summary) {
    return applyDecorators(
        ApiOperation({
          summary,
          description: '특정 id에 해당하는 해시태그를 조회합니다.',
        }),
        ApiParam({
          name: 'id',
          required: true,
          description: '해시태그 Id',
        }),
    );
  },
  findHashtagByWord(summary: string) {
    return applyDecorators(
        ApiOperation({
          summary,
          description: 'word에 해당하는 해시태그를 조회합니다.',
        }),
        ApiParam({
          name: 'word',
          required: true,
          description: '단어',
        }),
    );
  },
};

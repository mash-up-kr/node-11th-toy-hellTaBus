import {Controller, Get, Param, ParseIntPipe} from '@nestjs/common';
import {ApiParam, ApiTags} from '@nestjs/swagger';
import {ApiDocs} from './hashtag.docs';
import {HashtagService} from './hashtag.service';

@ApiTags('Hashtag')
@Controller('hashtag')
export class HashtagController {
  constructor(private readonly hashtagService: HashtagService) {}

    @Get(':id')
    @ApiDocs.findHashtag('해시태그 조회')
  findHashtag(@Param('id', ParseIntPipe) id: number) {
    return this.hashtagService.findHashtag(id);
  }

    @Get('/search/:word')
    @ApiParam({
      name: 'word',
      required: true,
      description: '단어',
    })
    @ApiDocs.findHashtag('단어로 해시태그 조회')
    findHashtagByWord(@Param('word') word: string) {
      return this.hashtagService.findHashtagByWord(word);
    }
}

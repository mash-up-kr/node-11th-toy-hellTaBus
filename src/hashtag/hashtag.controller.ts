import { Controller, Get, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { HashtagService } from './hashtag.service';

@ApiTags('Hashtag')
@Controller('hashtag')
export class HashtagController {
    constructor(private readonly hashtagService: HashtagService) {}

    @Get(':id')
    @ApiParam({
        name: 'id',
        required: true,
        description: '해시태그 Id',
    })
    @ApiOperation({
        summary: '해시태그 조회',
        description: '특정 id에 해당하는 해시태그를 조회합니다.',
    })
    findHashtag(@Param('id', ParseIntPipe) id: number) {
        return this.hashtagService.findHashtag(id);
    }

    @Get('/search/:word')
    @ApiParam({
        name: 'word',
        required: true,
        description: '단어',
    })
    @ApiOperation({
        summary: '단어로 해시태그 조회',
        description: '단어에 해당하는 해시태그를 조회합니다.',
    })
    findHashtagByWord(@Param('word') word: string) {
        return this.hashtagService.findHashtagByWord(word);
    }
}

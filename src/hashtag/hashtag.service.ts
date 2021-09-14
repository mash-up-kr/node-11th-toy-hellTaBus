import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Hashtag} from 'src/hashtag/entities/hashtag.entity';
import {Repository} from 'typeorm';

@Injectable()
export class HashtagService {
  constructor(
        @InjectRepository(Hashtag)
        private readonly hashtagRepository: Repository<Hashtag>,
  ) {}

  findHashtag(id: number) {
    return this.hashtagRepository.findOne({where: {id}});
  }

  findHashtagByWord(word: string) {
    return this.hashtagRepository.findOne({where: {tag: `#${word}`}});
  }
}

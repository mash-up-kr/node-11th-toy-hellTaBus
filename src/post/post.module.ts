import {Module} from '@nestjs/common';
import {PostService} from './post.service';
import {PostController} from './post.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Post} from './entities/post.entity';
import {Hashtag} from '../hashtag/entities/hashtag.entity';
import {User} from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Hashtag, User])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}

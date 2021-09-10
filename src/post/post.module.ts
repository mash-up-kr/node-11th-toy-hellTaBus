import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostLike } from './entities/postlike.entity';
import { Hashtag } from './entities/hashtag.entity';
import { Hashtag_Post } from './entities/hashtag_post.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Post, PostLike, Hashtag, Hashtag_Post])],
    controllers: [PostController],
    providers: [PostService],
})
export class PostModule {}

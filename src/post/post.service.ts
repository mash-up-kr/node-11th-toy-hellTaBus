import {
  BadRequestException, Injectable, UnauthorizedException,
} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Err} from 'src/error';
import {Connection, Repository} from 'typeorm';
import {UpdatePostDto} from './dto/update-post.dto';
import {Hashtag} from '../hashtag/entities/hashtag.entity';
import {HashtagPost} from './entities/hashtagPost.entity';
import {Post} from './entities/post.entity';
import {PostLike} from './entities/postlike.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(PostLike)
    private readonly postLikeRepository: Repository<PostLike>,
    @InjectRepository(Hashtag)
    private readonly hashtagRepository: Repository<Hashtag>,
    @InjectRepository(HashtagPost)
    private readonly HashtagPostRepository: Repository<HashtagPost>,
    private connection: Connection,
  ) {}

  async createPost(caption: string, userId: number) {
    let isSuccess = true;
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const post = await this.postRepository.save({
        caption,
        userId: userId,
      });
      const hashtags = caption.match(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g) || [];
      hashtags.map(async (hashtag) => {
        let returnedHahstag = await this.hashtagRepository.findOne({
          where: {tag: hashtag},
        });
        if (!returnedHahstag) {
          returnedHahstag = await this.hashtagRepository.save({
            tag: hashtag,
          });
        }
        return await this.HashtagPostRepository.save({
          hashtagId: returnedHahstag.id,
          postId: post.id,
        });
      });
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      isSuccess = false;
    } finally {
      await queryRunner.release();
      return isSuccess;
    }
  }

  async getPost(id: number) {
    return this.postRepository.findOne({where: {id}});
  }

  async updatePost(id: number, updatePostDto: UpdatePostDto, userId: number) {
    const post = await this.postRepository.findOne({
      where: {id},
      select: ['userId'],
    });
    if (post.userId !== userId) {
      throw new UnauthorizedException();
    }
    return await this.postRepository.update(id, updatePostDto);
  }

  async deletePost(id: number, userId: number) {
    const post = await this.postRepository.findOne({
      where: {id},
      select: ['userId'],
    });
    if (post.userId !== userId) {
      throw new UnauthorizedException();
    }
    await this.postRepository.delete(id);
  }

  async likePost(id: number, userId: number) {
    const alreadyLike = await this.postLikeRepository.findOne({
      postId: id,
      userId: userId,
    });
    if (alreadyLike) throw new BadRequestException(Err.ALREADY_LIKE);
    await this.postLikeRepository.save({
      postId: id,
      userId: userId,
    });
  }

  async dislikePost(id: number, userId: number) {
    const alreadyLike = await this.postLikeRepository.findOne({
      postId: id,
      userId: userId,
    });
    if (!alreadyLike) throw new BadRequestException(Err.ALREADY_DISLIKE);
    await this.postLikeRepository
        .createQueryBuilder('postLike')
        .delete()
        .from(PostLike)
        .andWhere('postLike.PostId = :id', {id})
        .andWhere('postLike.UserId = :userId', {userId})
        .execute();
  }
}

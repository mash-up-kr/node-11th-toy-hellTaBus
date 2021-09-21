import {
  BadRequestException, Injectable, UnauthorizedException,
} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Err} from 'src/error';
import {Connection, Repository} from 'typeorm';
import {UpdatePostDto} from './dto/update-post.dto';
import {Hashtag} from '../hashtag/entities/hashtag.entity';
import {Post} from './entities/post.entity';
import {User} from '../user/entities/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Hashtag)
    private readonly hashtagRepository: Repository<Hashtag>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private connection: Connection,
  ) {}

  async createPost(caption: string, userId: number) { // TODO: Need transaction
    const post = new Post();
    const user = await this.userRepository.findOne(userId); // TODO: Use userService?
    if (!user) {
      throw new BadRequestException(Err.NOT_EXISTING_USER);
    }

    const hashtags = caption.match(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g) || [];
    post.user = user;
    post.caption = caption;

    const hashtagEntityList = await Promise.all(hashtags.map(async (hashtag) => {
      let hashtagEntity = await this.hashtagRepository.findOne({
        where: {
          tag: hashtag,
        },
      });
      if (!hashtagEntity) {
        const newHashtagEntity = new Hashtag();
        newHashtagEntity.tag = hashtag;
        hashtagEntity = await this.hashtagRepository.save(newHashtagEntity);
      }
      return hashtagEntity;
    }));
    post.hashtags = hashtagEntityList;

    const createdPost = await this.postRepository.save(post);
    return createdPost;

    // Memo: 선우 로직 백업
    // let isSuccess = true;
    // const queryRunner = this.connection.createQueryRunner();
    // await queryRunner.connect();
    // await queryRunner.startTransaction();
    // try {
    //   const post = await this.postRepository.save({
    //     caption,
    //     userId: userId,
    //   });
    //   const hashtags = caption.match(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g) || [];
    //   hashtags.map(async (hashtag) => {
    //     let returnedHahstag = await this.hashtagRepository.findOne({
    //       where: {tag: hashtag},
    //     });
    //     if (!returnedHahstag) {
    //       returnedHahstag = await this.hashtagRepository.save({
    //         tag: hashtag,
    //       });
    //     }
    //     return await this.ashtagPostRepository.save({
    //       hashtagId: returnedHahstag.id,
    //       postId: post.id,
    //     });
    //   });
    //   await queryRunner.commitTransaction();
    // } catch (err) {
    //   await queryRunner.rollbackTransaction();
    //   isSuccess = false;
    // } finally {
    //   await queryRunner.release();
    //   return isSuccess;
    // }
  }

  async getPost(id: number) {
    return this.postRepository.findOne({
      where: {
        id,
      },
      relations: ['user'],
    });
  }

  async updatePost(id: number, updatePostDto: UpdatePostDto, userId: number) {
    const post = await this.postRepository.findOne({
      where: {
        id: id,
      },
      relations: ['user'],
    });
    if (post.user.id !== userId) {
      throw new UnauthorizedException();
    }
    // TODO: 해쉬태그 재반영
    return await this.postRepository.update(id, updatePostDto);
  }

  async deletePost(id: number, userId: number) {
    const post = await this.postRepository.findOne({
      where: {
        id: id,
      },
      relations: ['user'],
    });
    if (post.user.id !== userId) {
      throw new UnauthorizedException();
    }
    await this.postRepository.delete(id);
  }

  async likePost(postId: number, userId: number) { // TODO: Transaction?
    const post = await this.postRepository.findOne({
      where: {
        id: postId,
      },
      relations: ['likeUsers', 'user'],
    });

    if (!post) {
      throw new BadRequestException(Err.NOT_EXISTING_POST);
    }

    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new BadRequestException(Err.NOT_EXISTING_USER);
    }

    const isAlreadyLiked = !!post.likeUsers.find((user) => {
      return user.id === userId;
    });
    if (isAlreadyLiked) {
      throw new BadRequestException(Err.ALREADY_LIKE);
    }
    post.likeUsers.push(user);
    const savedPost = await this.postRepository.save(post);
    return savedPost;
  }

  async dislikePost(postId: number, userId: number) {
    const post = await this.postRepository.findOne({
      where: {
        id: postId,
      },
      relations: ['likeUsers'],
    });

    if (!post) {
      throw new BadRequestException(Err.NOT_EXISTING_POST);
    }

    const isAlreadyDisliked = !post.likeUsers.find((user) => {
      return user.id === userId;
    });
    if (isAlreadyDisliked) {
      throw new BadRequestException(Err.ALREADY_DISLIKE);
    }
    post.likeUsers = post.likeUsers.filter((user) => {
      return user.id !== userId;
    });
    const savedPost = await this.postRepository.save(post);
    return savedPost;
  }
}

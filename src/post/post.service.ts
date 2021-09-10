import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { use } from 'passport';
import { IsNull, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Hashtag } from './entities/hashtag.entity';
import { Hashtag_Post } from './entities/hashtag_post.entity';
import { Post } from './entities/post.entity';
import { PostLike } from './entities/postlike.entity';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
        @InjectRepository(PostLike)
        private readonly postLikeRepository: Repository<PostLike>,
        @InjectRepository(Hashtag)
        private readonly hashtagRepository: Repository<Hashtag>,
        @InjectRepository(Hashtag_Post)
        private readonly hashtag_postRepository: Repository<Hashtag_Post>,
    ) {}

    async createPost(caption: string, userId: number) {
        const PostReturned = await this.postRepository.save({
            caption,
            UserId: userId,
        });
        const hashtags = caption.match(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g) || [];
        hashtags.map(async hashtag => {
            const ExistedHahstag = await this.hashtagRepository.findOne({
                where: { tag: hashtag },
            });
            if (!ExistedHahstag) {
                const ReturnedHahstag = await this.hashtagRepository.save({
                    tag: hashtag,
                });
                return await this.hashtag_postRepository.save({
                    HashtagId: ReturnedHahstag.id,
                    PostId: PostReturned.id,
                });
            }
            await this.hashtag_postRepository.save({
                HashtagId: ExistedHahstag.id,
                PostId: PostReturned.id,
            });
        });
    }

    async getPost(id: number) {
        return this.postRepository.findOne({ where: { id } });
    }

    async updatePost(id: number, updatePostDto: UpdatePostDto, userId: number) {
        const post = await this.postRepository.findOne({
            where: { id },
            select: ['UserId'],
        });
        if (post.UserId !== userId) {
            throw new UnauthorizedException();
        }
        await this.postRepository.update(id, updatePostDto);
    }

    async deletePost(id: number, userId: number) {
        const post = await this.postRepository.findOne({
            where: { id },
            select: ['UserId'],
        });
        if (post.UserId !== userId) {
            throw new UnauthorizedException();
        }
        await this.postRepository.delete(id);
    }

    async likePost(id: number, userId: number) {
        await this.postLikeRepository.save({
            PostId: id,
            UserId: userId,
        });
    }

    async dislikePost(id: number, userId: number) {
        await this.postLikeRepository
            .createQueryBuilder('postLike')
            .delete()
            .from(PostLike)
            .andWhere('postLike.PostId = :id', { id })
            .andWhere('postLike.UserId = :userId', { userId })
            .execute();
    }
}

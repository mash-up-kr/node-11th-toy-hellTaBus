import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { use } from 'passport';
import { IsNull, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { PostLike } from './entities/postlike.entity';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
        @InjectRepository(PostLike)
        private readonly postLikeRepository: Repository<PostLike>,
    ) {}

    async createPost(caption: string, userId: number) {
        await this.postRepository.save({
            caption: caption,
            UserId: userId,
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
        console.log(post);
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
        const like = await this.postLikeRepository
            .createQueryBuilder('postLike')
            .delete()
            .from(PostLike)
            .andWhere('postLike.PostId = :id', { id })
            .andWhere('postLike.UserId = :userId', { userId })
            .execute();
    }
}

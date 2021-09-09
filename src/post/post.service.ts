import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
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

    async update(id: number, updatePostDto: UpdatePostDto, userId: number) {
        const post = await this.postRepository.findOne({
            where: { id },
            select: ['UserId'],
        });
        if (post.UserId !== userId) {
            throw new UnauthorizedException();
        }
        await this.postRepository.update(id, updatePostDto);
    }

    async remove(id: number, userId: number) {
        const post = await this.postRepository.findOne({
            where: { id },
            select: ['UserId'],
        });
        if (post.UserId !== userId) {
            throw new UnauthorizedException();
        }
        await this.postRepository.delete(id);
    }
}

import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Req,
    UseGuards,
    ParseIntPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('post')
@UseGuards(JwtAuthGuard)
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Post()
    create(@Req() req, @Body() body: CreatePostDto) {
        return this.postService.createPost(body.caption, req.user.id);
    }

    @Get(':id')
    getPost(@Param('id', ParseIntPipe) id: number) {
        return this.postService.getPost(id);
    }

    @Patch(':id')
    updatePost(
        @Req() req,
        @Param('id', ParseIntPipe) id: number,
        @Body() updatePostDto: UpdatePostDto,
    ) {
        return this.postService.update(id, updatePostDto, req.user.id);
    }

    @Delete(':id')
    remove(@Req() req, @Param('id', ParseIntPipe) id: number) {
        return this.postService.remove(id, req.user.id);
    }
}

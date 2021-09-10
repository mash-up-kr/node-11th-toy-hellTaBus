import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '우리 오래봅시다.', description: '게시물 내용' })
    caption: string;
}

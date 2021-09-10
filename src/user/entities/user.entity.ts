import { Post } from 'src/post/entities/post.entity';
import { PostLike } from 'src/post/entities/postlike.entity';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ length: 60 })
    password: string;

    @Column({ length: 255, unique: true })
    email: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date | null;

    @OneToMany(() => Post, post => post.user)
    post: Post[];

    @OneToMany(() => PostLike, postLike => postLike.user)
    postLike: PostLike[];
}

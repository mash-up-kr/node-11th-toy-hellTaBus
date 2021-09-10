import { User } from 'src/user/entities/user.entity';
import {
    Column,
    DeleteDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Post } from './post.entity';

@Entity('postLike')
export class PostLike {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    userId: number;

    @Column()
    postId: number;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date | null;

    @ManyToOne(() => User, user => user.postLike, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
    user: User;

    @ManyToOne(() => Post, post => post.postLike, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn([{ name: 'postId', referencedColumnName: 'id' }])
    post: Post;
}

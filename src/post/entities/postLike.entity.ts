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

@Index('UserId', ['UserId'], {})
@Index('PostId', ['PostId'], {})
@Entity('postLike')
export class PostLike {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    UserId: number;

    @Column()
    PostId: number;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date | null;

    @ManyToOne(() => User, user => user.PostLike, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn([{ name: 'UserId', referencedColumnName: 'id' }])
    User: User;

    @ManyToOne(() => Post, post => post.PostLike, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn([{ name: 'PostId', referencedColumnName: 'id' }])
    Post: Post;
}

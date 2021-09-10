import { User } from 'src/user/entities/user.entity';
import {
    Column,
    DeleteDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Hashtag_Post } from './hashtag_post.entity';
import { PostLike } from './postlike.entity';

@Index('userId', ['userId'], {})
@Entity('post')
export class Post {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    userId: number;

    @Column()
    caption: string;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date | null;

    @ManyToOne(() => User, user => user.post, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
    user: User;

    @OneToMany(() => PostLike, postLike => postLike.post)
    postLike: PostLike[];

    @OneToMany(() => Hashtag_Post, hashtag_post => hashtag_post.post)
    hashtag: Hashtag_Post[];
}

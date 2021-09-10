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

@Index('UserId', ['UserId'], {})
@Entity('post')
export class Post {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    UserId: number;

    @Column()
    caption: string;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date | null;

    @ManyToOne(() => User, user => user.Post, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn([{ name: 'UserId', referencedColumnName: 'id' }])
    User: User;

    @OneToMany(() => PostLike, postLike => postLike.Post)
    PostLike: PostLike[];

    @OneToMany(() => Hashtag_Post, hashtag_post => hashtag_post.Post)
    Hashtag: Hashtag_Post[];
}

import { User } from 'src/user/entities/user.entity';
import {
    Column,
    DeleteDateColumn,
    Entity,
    Index,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Hashtag } from './hashtag.entity';
import { Post } from './post.entity';

@Entity('hashtag_post')
export class Hashtag_Post {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    hashtagId: number;

    @Column()
    postId: number;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date | null;

    @ManyToOne(() => Post, post => post.hashtag, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn([{ name: 'postId', referencedColumnName: 'id' }])
    post: Post;

    @ManyToOne(() => Hashtag, hashtag => hashtag.post, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn([{ name: 'hashtagId', referencedColumnName: 'id' }])
    hashtag: Hashtag;
}

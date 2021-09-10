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
    HashtagId: number;

    @Column()
    PostId: number;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date | null;

    @ManyToOne(() => Post, post => post.Hashtag, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn([{ name: 'PostId', referencedColumnName: 'id' }])
    Post: Post;

    @ManyToOne(() => Hashtag, hashtag => hashtag.Post, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn([{ name: 'HashtagId', referencedColumnName: 'id' }])
    Hashtag: Hashtag;
}

import {
  Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm';
import {Hashtag} from '../../hashtag/entities/hashtag.entity';
import {Post} from './post.entity';

@Entity('hashtagPost')
export class HashtagPost {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    hashtagId: number;

    @Column()
    postId: Date;

    @DeleteDateColumn()
    deletedAt: Date | null;

    @ManyToOne(() => Post, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })
    hashtag: Hashtag;

    @ManyToOne(() => Post, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })
    post: Post;
}

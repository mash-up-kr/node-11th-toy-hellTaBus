import {User} from '../../user/entities/user.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {HashtagPost} from './hashtagPost.entity';
import {PostLike} from './postlike.entity';

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

  @ManyToOne(() => User, (user) => user.post, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;

  @OneToMany(() => PostLike, (postLike) => postLike.postId)
  postLike: PostLike[];

  @OneToMany(() => HashtagPost, (hashtagPost) => hashtagPost.postId)
  hashtag: HashtagPost[];
}

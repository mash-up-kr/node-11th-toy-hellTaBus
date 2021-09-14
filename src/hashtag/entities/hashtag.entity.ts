import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {HashtagPost} from '../../post/entities/hashtagPost.entity';

@Entity('hashtag')
export class Hashtag {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  tag: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToMany(() => HashtagPost, (hashtagPost) => hashtagPost.hashtagId)
  post: HashtagPost[];
}

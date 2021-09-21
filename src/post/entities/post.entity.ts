import {User} from '../../user/entities/user.entity';
import {
  Column,
  DeleteDateColumn,
  Entity, JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {Hashtag} from '../../hashtag/entities/hashtag.entity';

@Entity('post')
export class Post {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  caption: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @ManyToMany(() => Hashtag)
  @JoinTable({
    name: 'postHashtag',
  })
  hashtags: Hashtag[];

  @ManyToMany(() => User, (user) => user.likePosts)
  likeUsers: User[];

  @Column()
  likeCnt: number;
}

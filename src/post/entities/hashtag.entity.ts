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
import { Hashtag_Post } from './hashtag_post.entity';
import { Post } from './post.entity';

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

    @OneToMany(() => Hashtag_Post, hashtag_post => hashtag_post.Hashtag)
    Post: Hashtag_Post[];
}

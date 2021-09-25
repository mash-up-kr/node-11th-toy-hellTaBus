import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  // TODO: 해쉬태그 카운트?
}

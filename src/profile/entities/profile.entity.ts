import {
  Column, CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import {User} from '../../user/entities/user.entity';

@Entity('profile')
export class Profile {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({length: 30})
  nickname: string;

  @Column('date')
  birthday: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}

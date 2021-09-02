import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
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

  @Column('timestamp', {name: 'created_at', default: () => 'now()'})
  createdAt: Date;

  @Column('timestamp', {name: 'updated_at', default: () => 'now()'})
  updatedAt: Date;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}

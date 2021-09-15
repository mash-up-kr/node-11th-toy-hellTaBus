import {
  Column,
  CreateDateColumn,
  Entity, ManyToOne,
  PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import {User} from './user.entity';
import dayjs from 'dayjs';

@Entity('refreshToken')
export class RefreshToken {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({length: 60})
  refreshToken: string;

  @Column('date')
  expireDate: Date | null;

  get isExpired(): boolean {
    return dayjs(this.expireDate).isAfter(dayjs());
  }

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.refreshToken)
  user: User;
}

import {
  Column,
  CreateDateColumn, DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({length: 60})
  password: string;

  @Column({length: 255, unique: true})
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}

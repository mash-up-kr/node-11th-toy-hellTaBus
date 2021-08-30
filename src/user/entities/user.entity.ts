import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({length: 20})
  password: string;

  @Column({length: 30})
  nickname: string;

  @Column({length: 255, unique: true})
  email: string;

  @Column('date')
  birthday: Date;

  @Column('timestamp', {name: 'created_at', default: () => 'now()'})
  createdAt: Date;

  @Column('timestamp', {name: 'updated_at', default: () => 'now()'})
  updatedAt: Date;

  @Column('timestamp', {name: 'deleted_at', nullable: true})
  deletedAt: Date | null;
}

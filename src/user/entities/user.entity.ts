import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({length: 20})
  password: string;

  @Column({length: 255, unique: true})
  email: string;

  @Column('timestamp', {name: 'deleted_at', nullable: true})
  deletedAt: Date | null;
}

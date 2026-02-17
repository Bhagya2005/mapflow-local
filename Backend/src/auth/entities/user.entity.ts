import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Category } from '../../categories/entity/category.entity';
import { Pin } from '../../pins/entity/pin.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name : string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ default: 'user' })
  role: string;

  @ManyToMany(() => Category, (category) => category.users)
  categories: Category[];

  @ManyToMany(() => Pin, (pin) => pin.users)
  pins: Pin[];
}
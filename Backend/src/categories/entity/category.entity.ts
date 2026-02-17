import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm'; // ManyToMany aur JoinTable add karein
import { User } from '../../auth/entities/user.entity';
import { Pin } from '../../pins/entity/pin.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  color: string;

  @ManyToMany(() => User, (user) => user.categories)
  @JoinTable({ name: 'category_users' }) 
  users: User[]; 

  @ManyToMany(() => Pin, (pin) => pin.categories)
  pins: Pin[];
}


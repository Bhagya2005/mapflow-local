
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Category } from '../../categories/entity/category.entity'; 
import { User } from 'src/auth/entities/user.entity';

@Entity('pins')
export class Pin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'double precision' })
  lat: number;

  @Column({ type: 'double precision' })
  lng: number;

  @ManyToMany(() => Category, (category) => category.pins, {
    onDelete: 'CASCADE', 
  })
  @JoinTable({ name: 'pin_categories' }) 
  categories: Category[];

  @ManyToMany(() => User, (user) => user.pins, {
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'user_pins' }) 
  users: User[];
}

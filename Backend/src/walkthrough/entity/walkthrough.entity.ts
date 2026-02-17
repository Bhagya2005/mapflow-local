import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('walkthroughs')
export class Walkthrough {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column('text')
  description!: string;

  @Column()
  videoUrl!: string;
}
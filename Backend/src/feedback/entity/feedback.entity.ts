import {Entity, Column, PrimaryGeneratedColumn } from "typeorm";


@Entity('feedbacks')
export class Feedback{
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    rating : number;

    @Column('text')
    description : string;

    @Column()
    feedbackType:string;
}
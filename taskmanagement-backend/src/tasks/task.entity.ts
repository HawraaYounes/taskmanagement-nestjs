import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task-status-enum';

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    title: string;
  
    @Column()
    descrption: string;
  
    @Column()
    status: TaskStatus;
}
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task-status-enum';

@Entity()
export class Task {
    save() {
      throw new Error('Method not implemented.');
    }
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    title: string;
  
    @Column()
    description: string;
  
    @Column()
    status: TaskStatus;
}
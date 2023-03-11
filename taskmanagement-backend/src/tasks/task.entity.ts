import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { TaskStatus } from './task-status-enum';

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    title: string;
  
    @Column()
    description: string;
  
    @Column()
    status: TaskStatus;

    @ManyToOne(() => User, (user) => user.tasks,{eager:false})
    user: User
}
import { Task } from 'src/tasks/task.entity';
import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany } from 'typeorm';
@Unique(['username'])
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    username:string
    
    @Column()
    password: string;
  
   @Column()
   salt:string;

   @OneToMany(() => Task, (task) => task.user)
   tasks: Task[]
}
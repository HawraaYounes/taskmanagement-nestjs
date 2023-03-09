import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status-enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/create-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}
  // private tasks: Task[] = [];

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // getFilteredTasks(getFilteredTasks:GetTaskFilterDto):Task[]{
  //   const {search, status}=getFilteredTasks;
  //   let tasks=this.tasks;
  //   if(status){
  //     tasks=tasks.filter(task=>task.status===status)
  //   }
  //   if(search){
  //     tasks=tasks.filter(task=>task.title.includes(search) || task.description.includes(search))
  //   }
  //   return tasks;
  // }

  async getTaskById(id:number) :Promise<Task> {
     const task=await this.tasksRepository.findOneBy({ id });
     if(task){
      return task;
     }
     throw new NotFoundException(`Task with id: ${id} not found.`)
  }
  // getTaskById(id:string):Task{
  //   const task=this.tasks.find(task=>task.id===id);
  //   if(!task){
  //     throw new NotFoundException(`${id} is Invalid ID.`)
  //   }
  //   return task;
  // }

  async createTask(createTaskDto:CreateTaskDto): Promise<Task> {
    const {title,description}=createTaskDto;
    const task=new Task();
    task.title=title;
    task.descrption=description;
    task.status=TaskStatus.OPEN;
    await this.tasksRepository.save(task);
    return task;
  }

  // deleteTask(id:string):string{
  //   const task=this.getTaskById(id);
  //   if(task){
  //     this.tasks=this.tasks.filter(task=>task.id!==id);
  //     return "Task Deleted Successfully!"
  //   }
  //   throw new NotFoundException(`${id} is Invalid ID.`)
  // }

  // updateTaskStatus(id:string,status:TaskStatus):Task{
  //   const task:Task=this.getTaskById(id);
  //   task.status=status;
  //   return task;
  // }
}

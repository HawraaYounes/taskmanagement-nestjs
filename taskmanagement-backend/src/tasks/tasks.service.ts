import { Injectable } from '@nestjs/common';
import { TaskStatus } from './task-status-enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/create-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { DeleteResult, Like, Repository } from 'typeorm';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from 'src/user/user.entity';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async getTasks(getFilteredTasks:GetTaskFilterDto,user:User):Promise<Task[]>{
    const {search, status}=getFilteredTasks;
    let tasks=await this.tasksRepository.find({
      where:{
        userId: user.id
      } });
    if(status){
      tasks = await this.tasksRepository.find({
        where:{
          status: status,
          userId: user.id
        }
    })
    }
    if(search){
      tasks = await this.tasksRepository.find({
        where:
        {title: Like(`%${search}%`),
        userId:user.id}
      })
    }
    if(search && status){
      tasks=await this.tasksRepository.find({
        where:[ {
            userId: user.id,
            status:status,
            title: Like(`%${search}%`)
        },
      {
        userId: user.id,
        status:status,
        description: search,
      }],
    })
    }
    return tasks;
  }

  async getTaskById(id:number) :Promise<Task> {
     const task=await this.tasksRepository.findOneBy({ id });
      return task;
  }

  async createTask(createTaskDto:CreateTaskDto, user:User): Promise<Task> {
    const {title,description}=createTaskDto;
    const task=new Task();
    task.title=title;
    task.description=description;
    task.status=TaskStatus.OPEN;
    task.user=user;
    await this.tasksRepository.save(task);
    delete task.user;
    return task;
  }

  async deleteTask(id:number):Promise<DeleteResult> {
      return await this.tasksRepository.delete(id);
  }

  async updateTaskStatus(id: number, data:UpdateTaskDto):Promise<Task> {
    await this.tasksRepository.update({ id }, data);
    return await this.tasksRepository.findOneBy({id});
  }
}

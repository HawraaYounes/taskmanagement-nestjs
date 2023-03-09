import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status-enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/create-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { DeleteResult, Like, Repository, UpdateResult } from 'typeorm';
import { UpdateTaskDto } from './dto/update-task.dto';
import { title } from 'process';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async getAllTasks():Promise<Task[]> {
    return await this.tasksRepository.find();
  }

  async getFilteredTasks(getFilteredTasks:GetTaskFilterDto):Promise<Task[]>{
    const {search, status}=getFilteredTasks;
    let tasks=await this.getAllTasks();
    if(status){
      tasks = await this.tasksRepository.findBy({
        status: status,
    })
    }
    if(search){
      tasks = await this.tasksRepository.findBy({title: Like(`%${search}%`)})
    }
    if(search && status){
      tasks=await this.tasksRepository.find({
        where:[ {
            status:status,
            title: Like(`%${search}%`)
        },
      {
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

  async createTask(createTaskDto:CreateTaskDto): Promise<Task> {
    const {title,description}=createTaskDto;
    const task=new Task();
    task.title=title;
    task.description=description;
    task.status=TaskStatus.OPEN;
    return await this.tasksRepository.save(task);
  }

  async deleteTask(id:number):Promise<DeleteResult> {
      return await this.tasksRepository.delete(id);
  }

  async updateTaskStatus(id: number, data:UpdateTaskDto):Promise<Task> {
    await this.tasksRepository.update({ id }, data);
    return await this.tasksRepository.findOneBy({id});
  }
}

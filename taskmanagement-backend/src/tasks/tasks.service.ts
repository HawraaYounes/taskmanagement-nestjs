import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/create-tasks-filter.dto';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getFilteredTasks(getFilteredTasks:GetTaskFilterDto):Task[]{
    const {search, status}=getFilteredTasks;
    let tasks=this.tasks;
    if(status){
      tasks=tasks.filter(task=>task.status===status)
    }
    if(search){
      tasks=tasks.filter(task=>task.title.includes(search) || task.description.includes(search))
    }
    return tasks;
  }

  getTaskById(id:string):Task{
    const task=this.tasks.find(task=>task.id===id);
    if(!task){
      throw new NotFoundException(`${id} is Invalid ID.`)
    }
    return task;
  }

  createTask(createTaskDto:CreateTaskDto): Task {
    const {title,description}=createTaskDto;
    const task: Task = {
      id: uuidv4(),
      title: title,
      description: description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  deleteTask(id:string):string{
    const task=this.getTaskById(id);
    if(task){
      this.tasks=this.tasks.filter(task=>task.id!==id);
      return "Task Deleted Successfully!"
    }
    throw new NotFoundException(`${id} is Invalid ID.`)
  }

  updateTaskStatus(id:string,status:TaskStatus):Task{
    const task:Task=this.getTaskById(id);
    task.status=status;
    return task;
  }
}

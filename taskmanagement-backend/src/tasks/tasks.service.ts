import { Injectable } from '@nestjs/common';
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
    return this.tasks.find(task=>task.id===id);
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
    this.tasks=this.tasks.filter(task=>task.id!==id);
    return "Task Deleted Successfully!"
  }

  updateTaskStatus(id:string,status:TaskStatus):Task{
    const task:Task=this.getTaskById(id);
    task.status=status;
    return task;
  }
}

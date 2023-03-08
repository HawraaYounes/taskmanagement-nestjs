import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { Body, Query } from '@nestjs/common/decorators';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/create-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() getTaskFilter:GetTaskFilterDto): Task[] {
    if(Object.keys.length){
      return this.tasksService.getFilteredTasks(getTaskFilter);
    }
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id:string):Task{
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(
  @Body() createTaskDto:CreateTaskDto
  ): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id:string):string{
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(@Param('id') id:string,@Body('status') status:TaskStatus):Task{
    return this.tasksService.updateTaskStatus(id,status);
  }
}

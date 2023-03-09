import { Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Body, Query, UsePipes } from '@nestjs/common/decorators';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/create-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { DeleteResult } from 'typeorm';
import { UpdateTaskDto } from './dto/update-task.dto';


@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query(ValidationPipe) getTaskFilter:GetTaskFilterDto): Promise<Task[]> {
    if(Object.keys.length){
      return this.tasksService.getFilteredTasks(getTaskFilter);
    }
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id',ParseIntPipe) id:number):Promise<Task>{
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
  @Body() createTaskDto:CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id',ParseIntPipe) id:number):Promise<DeleteResult>{
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  @UsePipes(ValidationPipe)
  updateTaskStatus(@Param('id',ParseIntPipe) id:number,@Body()data:UpdateTaskDto){
    return this.tasksService.updateTaskStatus(id,data);
  }
}

import { Controller, Delete, Get, NotFoundException, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Body, Query, UseGuards, UsePipes } from '@nestjs/common/decorators';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/create-tasks-filter.dto';
import { Task } from './task.entity';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { DeleteResult } from 'typeorm';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/user/user.entity';


@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query(ValidationPipe) getTaskFilter:GetTaskFilterDto,
            @GetUser() user:User): Promise<Task[]> {
  
      return this.tasksService.getTasks(getTaskFilter,user);
    
    
  }

  @Get('/:id')
  async getTaskById(@Param('id',ParseIntPipe) id:number,@GetUser() user:User):Promise<Task>{
    const task=await this.tasksService.getTaskById(id,user);
    if(task){
      return task;
    }
    throw new NotFoundException(`Task with id ${id} not found.`)
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
  @Body() createTaskDto:CreateTaskDto,
  @GetUser() user:User
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto,user);
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

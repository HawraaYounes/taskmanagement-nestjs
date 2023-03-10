import { Controller, Get, Param } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private tasksService: UserService ){}

    @Get('/:id')
    getTaskById(@Param('username') username:string):Promise<User>{
        return this.tasksService.getUserByUsername(username);
    }
}

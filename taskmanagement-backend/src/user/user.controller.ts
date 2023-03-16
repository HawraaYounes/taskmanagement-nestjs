import { ClassSerializerInterceptor, Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private tasksService: UserService ){}

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/:id')
    getTaskById(@Param('username') username:string):Promise<User>{
        return this.tasksService.getUserByUsername(username);
    }
}

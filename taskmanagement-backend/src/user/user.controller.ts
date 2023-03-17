import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { SerializeInterceptor } from '../interceptors/serialize.interceptor';
@Controller('user')
export class UserController {

    constructor(private usersService: UserService ){}

    @UseInterceptors(SerializeInterceptor)
    @Get('/:username')
    async getUserByUsername(@Param('username') username:string):Promise<User>{
        console.log("hfhfhfh")
        return await this.usersService.getUserByUsername(username);
    }
}

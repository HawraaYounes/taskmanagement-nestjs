import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { SerializeInterceptor } from '../interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
@Controller('user')
export class UserController {

    constructor(private usersService: UserService ){}

    @UseInterceptors(new SerializeInterceptor(UserDto))
    @Get('/:username')
    async getUserByUsername(@Param('username') username:string):Promise<User>{
        return await this.usersService.getUserByUsername(username);
    }
}

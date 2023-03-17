import { Controller, Get, Param } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { Serialize } from './serializer.decorator';
import { UserDto } from './dto/user.dto';

@Serialize(UserDto)
@Controller('user')
export class UserController {

    constructor(private usersService: UserService ){}

    @Get('/:username')
    async getUserByUsername(@Param('username') username:string):Promise<User>{
        return await this.usersService.getUserByUsername(username);
    }
}

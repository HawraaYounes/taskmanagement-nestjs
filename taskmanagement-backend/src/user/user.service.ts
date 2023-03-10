import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddUserDto } from './dto/add-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
      ) {}
      async addUser(addUserDto:AddUserDto): Promise<User> {
        const {username,password}=addUserDto;
        const user=new User();
        user.username=username;
        user.password=password;
        return await this.userRepository.save(user);
      }

      async getUserByUsername(username:string) :Promise<User | undefined> {
        const user=await this.userRepository.findOneBy({ username });
         return user;
     }

}

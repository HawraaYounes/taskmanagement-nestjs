import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './auth-credentials.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
      ) {}

     async signUp(authcredentials:AuthCredentialsDto){
            const {username,password}=authcredentials;
            const user=new User();
            user.username=username;
            user.password=password;
            return await this.userRepository.save(user);
         
      }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './auth-credentials.dto';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
      ) {}

     async signUp(authcredentials:AuthCredentialsDto){
            const {username,password}=authcredentials;
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);
            const user=new User();
            user.username=username;
            user.password=hashedPassword;
            user.salt=salt;
            return await this.userRepository.save(user);
         
      }
}

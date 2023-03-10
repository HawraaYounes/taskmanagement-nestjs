import { Inject, Injectable } from '@nestjs/common';
import { AuthCredentialsDto } from './auth-credentials.dto';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {

        @Inject(UserService)
        private readonly userService: UserService;

     async signUp(authcredentials:AuthCredentialsDto){
            const {username,password}=authcredentials;
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);
            const user=new User();
            user.username=username;
            user.password=hashedPassword;
            user.salt=salt;
            return await this.userService.addUser(user);
         
      }

      async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.getUserByUsername(username)
        if (user && user.password === pass) {
          const { password, ...result } = user;
          return result;
        }
        return null;
      }
}

import { Inject, Injectable, UnauthorizedException, ValidationPipe } from '@nestjs/common';
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

      async validateUser(authCredentials:AuthCredentialsDto):Promise<any> {
        const {username,password}=authCredentials;
        const user = await this.userService.getUserByUsername(username);
        if(user){
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
            const {password,salt ,...result}= user;
            return result;
            }
        }
      }
}

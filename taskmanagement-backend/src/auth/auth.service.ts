import { Inject, Injectable } from '@nestjs/common';
import { AuthCredentialsDto } from './auth-credentials.dto';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
      constructor(
        @Inject(UserService)
        private readonly userService: UserService,
        private jwtService:JwtService
      ){}
       

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

      async validateUser(authCredentials:AuthCredentialsDto) {
        const {username,password}=authCredentials;
        const user = await this.userService.getUserByUsername(username);
        if(user){
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
            const {password,salt ,...result}= user;
            return await this.login(result);
            }
            return null;
        }
        return null;
      }

      async login(user:any):Promise<{access_token:string}> {
        const payload = { username: user.username , sub:user.id};
        const access_token=await this.jwtService.sign(payload);
        return {access_token};
      }

}

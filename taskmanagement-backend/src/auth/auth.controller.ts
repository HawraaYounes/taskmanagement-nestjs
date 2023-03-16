import { Body, Controller, Post, UnauthorizedException, ValidationPipe, } from '@nestjs/common';
import { AuthCredentialsDto } from './auth-credentials.dto';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity';


@Controller('auth')
export class AuthController {

    constructor(private authService:AuthService) {}

    @Post('/signup')
    signUp(
    @Body(ValidationPipe) authCredentials:AuthCredentialsDto): Promise<User> {
      return this.authService.signUp(authCredentials);
    }

    @Post('/signIn')
    async signIn(@Body(ValidationPipe) authCredentials:AuthCredentialsDto):Promise<{access_token:string}>{
    
      const token= await this.authService.validateUser(authCredentials);
        if(token){
          return token;
        }
        throw new UnauthorizedException('Invalid username and password.');
    }

}

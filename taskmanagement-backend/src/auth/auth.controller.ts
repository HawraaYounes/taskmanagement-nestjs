import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
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
    signIn(
    @Body(ValidationPipe) authCredentials:AuthCredentialsDto): Promise<User> {
      return this.authService.validateUser(authCredentials);
    }
}
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './auth-credentials.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(authCredentials:AuthCredentialsDto): Promise<any> {
    const user = await this.authService.validateUser(authCredentials);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
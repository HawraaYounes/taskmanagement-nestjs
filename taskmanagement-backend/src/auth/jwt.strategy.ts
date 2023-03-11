import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { UserService } from 'src/user/user.service';
import { UnauthorizedException } from '@nestjs/common/exceptions';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload:any) {
    const {username,...res}=payload;
    const user=await this.userService.getUserByUsername(username);
    if(user){
      return user;
    }
    throw new UnauthorizedException();
  }
}
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserDto } from 'src/user/dto/user.dto';

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');//run before request handler (before executing route in controller)

    return next
      .handle()
      .pipe(
        map((data:any)=>{
           return plainToClass(UserDto,data,{
            excludeExtraneousValues:true,
           });
        }),
      );
  }
}
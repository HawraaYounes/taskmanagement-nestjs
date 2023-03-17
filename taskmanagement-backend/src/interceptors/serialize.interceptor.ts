import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');//run before request handler (before executing route in controller)

    return next
      .handle()
      .pipe(
        map((data:any)=>{
            console.log('after',data); //run after the route is handled and before response is sent out
        })
      );
  }
}
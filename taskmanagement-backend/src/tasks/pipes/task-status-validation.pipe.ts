import {PipeTransform, BadRequestException  } from "@nestjs/common";
import { TaskStatus } from "../task-status-enum";

export class TaskStatusValidationPipe implements PipeTransform{
    readonly validStatuses=[ TaskStatus.OPEN,TaskStatus.IN_PROGRESS,TaskStatus.DONE ];

    transform(value: string ) {
        if(this.isValidStatus(value)){
            return value;
        }
            throw new BadRequestException(`${value} is not a valid status type.`);
      }
      
      isValidStatus(status:any):boolean{
        const idx=this.validStatuses.indexOf(status)
        return idx!==-1;
      }
        
      
}
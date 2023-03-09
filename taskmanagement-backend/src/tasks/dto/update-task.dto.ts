import { IsIn, IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../task-status-enum';

export class UpdateTaskDto{
    @IsIn([TaskStatus.OPEN,TaskStatus.IN_PROGRESS,TaskStatus.DONE])
    @IsNotEmpty()
    status:TaskStatus;
}
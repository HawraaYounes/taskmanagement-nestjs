import { IsNotEmpty } from 'class-validator';
export class AddUserDto{
    @IsNotEmpty()
   username:string;

    @IsNotEmpty()
    password:string;
}
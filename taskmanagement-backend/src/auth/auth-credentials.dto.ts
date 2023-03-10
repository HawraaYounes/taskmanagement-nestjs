import { IsNotEmpty, Matches, MinLength, MaxLength } from "class-validator";

export class AuthCredentialsDto{

    @IsNotEmpty()
    username:string;

    @MinLength(6)
    @MaxLength(15)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    {message:'Password should contain at least one upper case, one lower case, one number or special character.'})
    @IsNotEmpty()
    password:string;
}
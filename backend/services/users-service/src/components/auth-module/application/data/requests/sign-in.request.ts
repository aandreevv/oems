import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInRequest {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

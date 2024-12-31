import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class CreateAccountRequest {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
}

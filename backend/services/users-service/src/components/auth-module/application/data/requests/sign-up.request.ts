import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class SignUpRequest {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class SignUpRequest {
  @ApiProperty({
    description: 'User email (must be valid email)',
    example: `email${Math.floor(100000 + Math.random() * 900000)}@gmail.com`,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'User password (must be strong password)', example: `String!123` })
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
}

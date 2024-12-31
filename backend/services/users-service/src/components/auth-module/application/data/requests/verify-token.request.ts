import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyTokenRequest {
  @IsString()
  @IsNotEmpty()
  token: string;
}

import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokensRequest {
  @IsString()
  @IsNotEmpty()
  token: string;
}

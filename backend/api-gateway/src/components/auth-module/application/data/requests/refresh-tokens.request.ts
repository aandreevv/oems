import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokensRequest {
  @IsNotEmpty()
  @IsString()
  authorization: string;
}

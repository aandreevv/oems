import { ApiProperty } from '@nestjs/swagger';

export class AuthTokensResponse {
  constructor(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}

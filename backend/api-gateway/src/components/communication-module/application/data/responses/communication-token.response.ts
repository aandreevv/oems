import { ApiProperty } from '@nestjs/swagger';

export class CommunicationTokenResponse {
  @ApiProperty()
  token: string;

  @ApiProperty()
  expiresOn: Date;

  @ApiProperty()
  identityId: string;
}

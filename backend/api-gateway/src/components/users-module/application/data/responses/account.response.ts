import { ApiProperty } from '@nestjs/swagger';
import { ProfileResponse } from './profile.response';

export class AccountResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  profile?: ProfileResponse;
}

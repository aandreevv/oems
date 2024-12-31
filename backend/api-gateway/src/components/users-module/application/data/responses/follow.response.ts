import { ApiProperty } from '@nestjs/swagger';
import { AccountResponse } from './account.response';

export class FollowResponse {
  @ApiProperty()
  follower: AccountResponse;

  @ApiProperty()
  following: AccountResponse;
}

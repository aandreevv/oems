import { AccountResponse } from './account.response';
import { ProfileFullResponse } from './profile-full.response';
import { ApiProperty, OmitType } from '@nestjs/swagger';

export class AccountFullResponse extends OmitType(AccountResponse, ['profile']) {
  @ApiProperty()
  profile: ProfileFullResponse;
}

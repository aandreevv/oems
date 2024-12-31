import { AccountResponse } from './account.response';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { MyProfileFullResponse } from './my-profile-full.response';

export class MyAccountFullResponse extends OmitType(AccountResponse, ['profile']) {
  @ApiProperty()
  profile: MyProfileFullResponse;
}

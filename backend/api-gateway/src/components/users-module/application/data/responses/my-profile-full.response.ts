import { ApiProperty, OmitType } from '@nestjs/swagger';
import { ProfileDataResponse } from './profile-data.response';
import { ProfileResponse } from './profile.response';

export class MyProfileFullResponse extends ProfileResponse {
  @ApiProperty({ type: OmitType(ProfileDataResponse, ['followed']) })
  data: Omit<ProfileDataResponse, 'followed'>;
}

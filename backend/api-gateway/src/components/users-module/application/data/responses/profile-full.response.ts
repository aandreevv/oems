import { ProfileResponse } from './profile.response';
import { ProfileDataResponse } from './profile-data.response';
import { ApiProperty } from '@nestjs/swagger';

export class ProfileFullResponse extends ProfileResponse {
  @ApiProperty()
  data: ProfileDataResponse;
}

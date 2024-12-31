import { ApiProperty } from '@nestjs/swagger';

export class ProfileDataResponse {
  @ApiProperty()
  followers: number;

  @ApiProperty()
  followings: number;

  @ApiProperty()
  events: number;

  @ApiProperty()
  followed?: boolean;
}

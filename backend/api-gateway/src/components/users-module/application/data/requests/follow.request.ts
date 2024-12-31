import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class FollowRequest {
  @ApiProperty({ description: 'Id of existing user to follow/unfollow' })
  @IsUUID()
  @IsNotEmpty()
  userId: string;
}

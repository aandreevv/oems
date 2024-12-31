import { IsNotEmpty, IsUUID } from 'class-validator';

export class FollowRequest {
  @IsUUID()
  @IsNotEmpty()
  followerId: string;

  @IsUUID()
  @IsNotEmpty()
  followingId: string;
}

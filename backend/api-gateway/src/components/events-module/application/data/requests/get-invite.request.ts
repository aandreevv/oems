import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetInviteRequest {
  @ApiProperty({ description: 'Id of the existing invite ' })
  @IsUUID()
  @IsNotEmpty()
  inviteId: string;
}

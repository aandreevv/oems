import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class InviteUserToEventBodyRequest {
  @ApiProperty({ description: 'Additional text for invite (could be empty)', example: null })
  @IsString()
  @IsOptional()
  inviteText: string;
}

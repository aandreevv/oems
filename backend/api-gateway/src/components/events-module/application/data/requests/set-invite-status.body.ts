import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SetInviteStatusBody {
  @ApiProperty({ description: 'Response text of invite (nullable)', required: false })
  @IsString()
  @IsOptional()
  responseText?: string;
}

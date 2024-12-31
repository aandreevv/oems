import { ApiProperty } from '@nestjs/swagger';
import { GetInviteRequest } from './get-invite.request';
import { InviteStatusEnum } from '../enums/invite-status.enum';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class SetInviteStatusParams extends GetInviteRequest {
  @ApiProperty({ description: 'Status of the invite', enum: InviteStatusEnum, example: InviteStatusEnum.ACCEPTED })
  @IsEnum(InviteStatusEnum)
  @IsNotEmpty()
  status: InviteStatusEnum;
}

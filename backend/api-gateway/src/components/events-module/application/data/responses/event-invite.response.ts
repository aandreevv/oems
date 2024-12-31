import { AccountResponse } from '../../../../users-module/application/data/responses/account.response';
import { ApiProperty } from '@nestjs/swagger';

export class EventInviteResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  receiver: AccountResponse;

  @ApiProperty()
  inviteText?: string;

  @ApiProperty()
  responseText?: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  status: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { AccountResponse } from '../../../../users-module/application/data/responses/account.response';
import { EventInviteResponse } from './event-invite.response';

export class EventInviteReceiverResponse extends EventInviteResponse {
  @ApiProperty()
  receiver: AccountResponse;
}

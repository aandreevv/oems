import { EventInviteResponse } from './event-invite.response';
import { ApiProperty } from '@nestjs/swagger';
import { AccountResponse } from '../../../../users-module/application/data/responses/account.response';

export class EventInviteSenderResponse extends EventInviteResponse {
  @ApiProperty()
  sender: AccountResponse;
}

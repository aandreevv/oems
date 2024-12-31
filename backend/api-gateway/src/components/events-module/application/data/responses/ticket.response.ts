import { ApiProperty } from '@nestjs/swagger';
import { AccountResponse } from '../../../../users-module/application/data/responses/account.response';
import { EventResponse } from './event.response';

export class TicketResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  account: AccountResponse;

  @ApiProperty()
  event: EventResponse;

  @ApiProperty()
  createdAt: Date;
}

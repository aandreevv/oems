import { AccountInterface } from '../../../../../shared-module/application/data/interfaces/account.interface';
import { EventResponse } from './event.response';

export class TicketResponse {
  id: string;
  account: AccountInterface;
  event: EventResponse;
  createdAt: Date;
}

import { AccountInterface } from '../../../../../shared-module/application/data/interfaces/account.interface';
import { InviteStatusEnum } from '../enums/invite-status.enum';
import { EventResponse } from './event.response';

export class EventInviteResponse {
  id: string;
  receiver?: AccountInterface;
  sender?: AccountInterface;
  inviteText?: string;
  responseText?: string;
  status: InviteStatusEnum;
  createdAt: Date;
  updatedAt: Date;
  event: EventResponse;
}

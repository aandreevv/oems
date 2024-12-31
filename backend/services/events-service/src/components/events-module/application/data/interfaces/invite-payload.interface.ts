import { EventEntity } from '../entities/event.entity';
import { AccountInterface } from '../../../../../shared-module/application/data/interfaces/account.interface';

export interface InvitePayload {
  event: EventEntity;
  sender: AccountInterface;
  receiver: AccountInterface;
  inviteText: string;
}

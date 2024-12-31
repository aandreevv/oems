import { GetEventRequest } from './get-event.request';
import { AccountInterface } from '../../../../../shared-module/application/data/interfaces/account.interface';

export class InviteUserToEventRequest extends GetEventRequest {
  receiverId: string;
  sender: AccountInterface;
  inviteText: string;
}

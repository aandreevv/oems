import { AccountInterface } from '../../../../../shared-module/application/data/interfaces/account.interface';
import { GetEventRequest } from './get-event.request';

export class AttendEventRequest extends GetEventRequest {
  account: AccountInterface;
}

import { EventAccessEnum } from '../enums/event-access.enum';
import { AccountInterface } from '../../../../../shared-module/application/data/interfaces/account.interface';
import { EventTypeEnum } from '../enums/event-type.enum';

export class EventResponse {
  id: string;
  name: string;
  description?: string;
  date: Date;
  access: EventAccessEnum;
  paid: boolean;
  price?: number;
  image?: string;
  roomId: string;
  chatId: string;
  type: EventTypeEnum;
  categories: string[];
  owner: AccountInterface;
}

import { EventResponse } from '../responses/event.response';
import { EventEntity } from '../entities/event.entity';
import { AccountInterface } from '../../../../../shared-module/application/data/interfaces/account.interface';

export class EventMapper {
  static requestToGetResponse(
    entity: EventEntity,
    owner: AccountInterface,
  ): EventResponse {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      price: entity.price,
      paid: entity.paid,
      image: entity.image,
      roomId: entity.roomId,
      chatId: entity.chatId,
      type: entity.type,
      categories: entity.categories,
      date: entity.date,
      access: entity.access,
      owner,
    };
  }
}

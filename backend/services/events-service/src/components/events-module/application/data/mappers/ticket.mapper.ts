import { TicketEntity } from '../entities/ticket.entity';
import { TicketResponse } from '../responses/ticket.response';
import { AccountInterface } from '../../../../../shared-module/application/data/interfaces/account.interface';
import { EventMapper } from './event.mapper';

export class TicketMapper {
  static requestToGetResponse(
    entity: TicketEntity,
    account: AccountInterface,
    eventOwner: AccountInterface,
  ): TicketResponse {
    return {
      id: entity.id,
      event: EventMapper.requestToGetResponse(entity.event, eventOwner),
      createdAt: entity.createdAt,
      account,
    };
  }
}

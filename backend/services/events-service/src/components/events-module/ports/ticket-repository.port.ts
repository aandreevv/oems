import { EventEntity } from '../application/data/entities/event.entity';
import { AccountInterface } from '../../../shared-module/application/data/interfaces/account.interface';
import { TicketEntity } from '../application/data/entities/ticket.entity';

export abstract class TicketRepositoryPort {
  abstract create(
    event: EventEntity,
    account: AccountInterface,
  ): Promise<TicketEntity>;
}

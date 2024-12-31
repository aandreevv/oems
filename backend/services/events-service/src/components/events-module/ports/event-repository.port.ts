import { CreateEventRequest } from '../application/data/requests/create-event.request';
import { EventEntity } from '../application/data/entities/event.entity';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';

export abstract class EventRepositoryPort {
  abstract create(
    createArgs: CreateEventRequest,
    roomId?: string,
    chatId?: string,
  ): Promise<EventEntity>;

  abstract findById(
    id: string,
    relations?: FindOptionsRelations<EventEntity>,
  ): Promise<EventEntity>;

  abstract countByOwner(ownerId: string): Promise<number>;

  abstract findByOwner(ownerId: string): Promise<EventEntity[]>;

  abstract findRecommended(): Promise<EventEntity[]>;

  abstract searchEvents(name: string): Promise<EventEntity[]>;
}

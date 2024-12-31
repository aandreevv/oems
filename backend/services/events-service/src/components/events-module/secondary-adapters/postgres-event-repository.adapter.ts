import { Injectable } from '@nestjs/common';
import { EventRepositoryPort } from '../ports/event-repository.port';
import { EventEntity } from '../application/data/entities/event.entity';
import { CreateEventRequest } from '../application/data/requests/create-event.request';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';

@Injectable()
export class PostgresEventRepositoryAdapter implements EventRepositoryPort {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
  ) {}

  searchEvents(search: string): Promise<EventEntity[]> {
    return this.eventRepository
      .createQueryBuilder('event')
      .where('LOWER(event.name) LIKE :search', {
        search: `%${search}%`,
      })
      .getMany();
  }

  findRecommended(): Promise<EventEntity[]> {
    return this.eventRepository.find({ take: 10, order: { date: 'asc' } });
  }

  findByOwner(ownerId: string): Promise<EventEntity[]> {
    return this.eventRepository.find({
      where: { ownerId },
      order: { date: 'asc' },
    });
  }

  countByOwner(ownerId: string): Promise<number> {
    return this.eventRepository.count({ where: { ownerId } });
  }

  findById(
    id: string,
    relations?: FindOptionsRelations<EventEntity>,
  ): Promise<EventEntity> {
    return this.eventRepository.findOne({
      where: { id },
      relations,
    });
  }

  create(
    createArgs: CreateEventRequest,
    roomId?: string,
    chatId?: string,
  ): Promise<EventEntity> {
    return this.eventRepository.save({ ...createArgs, roomId, chatId });
  }
}

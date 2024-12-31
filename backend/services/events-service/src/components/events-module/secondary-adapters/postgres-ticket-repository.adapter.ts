import { Injectable } from '@nestjs/common';
import { TicketRepositoryPort } from '../ports/ticket-repository.port';
import { AccountInterface } from 'src/shared-module/application/data/interfaces/account.interface';
import { EventEntity } from '../application/data/entities/event.entity';
import { TicketEntity } from '../application/data/entities/ticket.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostgresTicketRepositoryAdapter implements TicketRepositoryPort {
  constructor(
    @InjectRepository(TicketEntity)
    private readonly ticketEntityRepository: Repository<TicketEntity>,
  ) {}

  create(event: EventEntity, account: AccountInterface): Promise<TicketEntity> {
    return this.ticketEntityRepository.save({ event, userId: account.id });
  }
}

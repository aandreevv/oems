import { AttendeeEntity } from '../application/data/entities/attendee.entity';
import { AttendeeRepositoryPort } from '../ports/attendee-repository.port';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountInterface } from 'src/shared-module/application/data/interfaces/account.interface';
import { Repository } from 'typeorm';
import { EventEntity } from '../application/data/entities/event.entity';

@Injectable()
export class PostgresAttendeeRepositoryAdapter
  implements AttendeeRepositoryPort
{
  constructor(
    @InjectRepository(AttendeeEntity)
    private readonly attendeeRepository: Repository<AttendeeEntity>,
  ) {}

  findByAccount(accountId: string): Promise<AttendeeEntity[]> {
    return this.attendeeRepository.find({
      where: { accountId },
      relations: { event: true },
    });
  }

  findByEventAndAccount(
    event: EventEntity,
    accountId: string,
  ): Promise<AttendeeEntity> {
    return this.attendeeRepository.findOne({ where: { event, accountId } });
  }

  create(
    event: EventEntity,
    account: AccountInterface,
  ): Promise<AttendeeEntity> {
    return this.attendeeRepository.save({ event, accountId: account.id });
  }
}

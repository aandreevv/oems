import { EventEntity } from '../application/data/entities/event.entity';
import { AttendeeEntity } from '../application/data/entities/attendee.entity';
import { AccountInterface } from '../../../shared-module/application/data/interfaces/account.interface';

export abstract class AttendeeRepositoryPort {
  abstract create(
    event: EventEntity,
    account: AccountInterface,
  ): Promise<AttendeeEntity>;

  abstract findByEventAndAccount(
    event: EventEntity,
    accountId: string,
  ): Promise<AttendeeEntity>;

  abstract findByAccount(accountId: string): Promise<AttendeeEntity[]>;
}

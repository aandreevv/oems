import { Injectable, NotFoundException } from '@nestjs/common';
import { EventRepositoryPort } from '../../ports/event-repository.port';
import { UsersService } from '../../../../shared-module/secondary-adapters/services/users.service';
import { GetEventRequest } from '../data/requests/get-event.request';
import { AccountInterface } from '../../../../shared-module/application/data/interfaces/account.interface';
import { RpcException } from '@nestjs/microservices';
import { EVENT_IS_NOT_FOUND } from '../../../../constants/exceptions';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GetEventAttendees {
  constructor(
    private readonly eventRepository: EventRepositoryPort,
    private readonly usersService: UsersService,
  ) {}

  async execute({ eventId }: GetEventRequest): Promise<AccountInterface[]> {
    const event = await this.eventRepository.findById(eventId, {
      attendees: true,
    });

    if (!event)
      throw new RpcException(new NotFoundException(EVENT_IS_NOT_FOUND));

    return firstValueFrom(
      this.usersService.getAccountsByIds(
        event.attendees.map((attendee) => attendee.accountId),
      ),
    );
  }
}

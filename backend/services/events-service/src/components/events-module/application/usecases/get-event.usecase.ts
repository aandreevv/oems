import { Injectable, NotFoundException } from '@nestjs/common';
import { EventRepositoryPort } from '../../ports/event-repository.port';
import { RpcException } from '@nestjs/microservices';
import { EventMapper } from '../data/mappers/event.mapper';
import { UsersService } from '../../../../shared-module/secondary-adapters/services/users.service';
import { firstValueFrom } from 'rxjs';
import { GetEventRequest } from '../data/requests/get-event.request';
import { EventResponse } from '../data/responses/event.response';
import { EVENT_IS_NOT_FOUND } from '../../../../constants/exceptions';

@Injectable()
export class GetEvent {
  constructor(
    private readonly eventRepository: EventRepositoryPort,
    private readonly usersService: UsersService,
  ) {}

  async execute({ eventId }: GetEventRequest): Promise<EventResponse> {
    const event = await this.eventRepository.findById(eventId);

    if (!event)
      throw new RpcException(new NotFoundException(EVENT_IS_NOT_FOUND));

    const owner = await firstValueFrom(
      this.usersService.getAccountById(event.ownerId),
    );

    return EventMapper.requestToGetResponse(event, owner);
  }
}

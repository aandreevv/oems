import { Injectable } from '@nestjs/common';
import { EventRepositoryPort } from '../../ports/event-repository.port';
import { SearchEventsRequest } from '../data/requests/search-events.request';
import { EventResponse } from '../data/responses/event.response';
import { EventMapper } from '../data/mappers/event.mapper';
import { firstValueFrom } from 'rxjs';
import { UsersService } from '../../../../shared-module/secondary-adapters/services/users.service';

@Injectable()
export class SearchEvents {
  constructor(
    private readonly eventRepository: EventRepositoryPort,
    private readonly usersService: UsersService,
  ) {}

  async execute({ search }: SearchEventsRequest): Promise<EventResponse[]> {
    const events = await this.eventRepository.searchEvents(
      search.toLowerCase(),
    );
    const owners = await firstValueFrom(
      this.usersService.getAccountsByIds(events.map((event) => event.ownerId)),
    );
    return events.map((event) =>
      EventMapper.requestToGetResponse(
        event,
        owners.find((owner) => event.ownerId === owner.id),
      ),
    );
  }
}

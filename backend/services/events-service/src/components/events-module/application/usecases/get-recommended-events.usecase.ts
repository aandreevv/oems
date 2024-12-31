import { BadRequestException, Injectable } from '@nestjs/common';
import { EventRepositoryPort } from '../../ports/event-repository.port';
import { GetRecommendedEventsRequest } from '../data/requests/get-recommended-events.request';
import { EventResponse } from '../data/responses/event.response';
import { EventMapper } from '../data/mappers/event.mapper';
import { UsersService } from '../../../../shared-module/secondary-adapters/services/users.service';
import { firstValueFrom } from 'rxjs';
import { CAN_NOT_FIND_RECOMMENDED_EVENTS } from '../../../../constants/exceptions';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class GetRecommendedEvents {
  constructor(
    private readonly eventRepository: EventRepositoryPort,
    private readonly usersService: UsersService,
  ) {}

  async execute(): Promise<EventResponse[]> {
    const events = await this.eventRepository.findRecommended();
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

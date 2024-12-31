import { Injectable } from '@nestjs/common';
import { EventRepositoryPort } from '../../ports/event-repository.port';
import { CreateEventRequest } from '../data/requests/create-event.request';
import { EventResponse } from '../data/responses/event.response';
import { EventMapper } from '../data/mappers/event.mapper';
import { CommunicationService } from '../../../../shared-module/secondary-adapters/services/communication.service';
import { firstValueFrom } from 'rxjs';
import { UsersService } from '../../../../shared-module/secondary-adapters/services/users.service';

@Injectable()
export class CreateEvent {
  constructor(
    private readonly eventRepository: EventRepositoryPort,
    private readonly communicationService: CommunicationService,
    private readonly usersService: UsersService,
  ) {}

  async execute(body: CreateEventRequest): Promise<EventResponse> {
    const owner = await firstValueFrom(
      this.usersService.getAccountById(body.ownerId),
    );

    const [room, chat] = await Promise.all([
      firstValueFrom(this.communicationService.createRoom(body.date)),
      firstValueFrom(this.communicationService.createChat(owner, body.name)),
    ]);

    const event = await this.eventRepository.create(
      {
        ...body,
        ownerId: owner.id,
      },
      room.roomId,
      chat.threadId,
    );

    await firstValueFrom(this.communicationService.joinRoom(owner, event));

    return EventMapper.requestToGetResponse(event, owner);
  }
}

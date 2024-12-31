import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EventRepositoryPort } from '../../ports/event-repository.port';
import { EventInviteResponse } from '../data/responses/event-invite.response';
import { GetEventRequest } from '../data/requests/get-event.request';
import { RpcException } from '@nestjs/microservices';
import {
  EVENT_IS_NOT_FOUND,
  YOU_ARE_NOT_OWNER_OF_THE_EVENT,
} from '../../../../constants/exceptions';
import { UsersService } from '../../../../shared-module/secondary-adapters/services/users.service';
import { firstValueFrom } from 'rxjs';
import { InviteMapper } from '../data/mappers/invite.mapper';

@Injectable()
export class GetEventInvites {
  constructor(
    private readonly eventRepository: EventRepositoryPort,
    private readonly usersService: UsersService,
  ) {}

  async execute({
    eventId,
    account,
  }: GetEventRequest): Promise<EventInviteResponse[]> {
    const event = await this.eventRepository.findById(eventId, {
      invites: true,
    });

    if (!event)
      throw new RpcException(new NotFoundException(EVENT_IS_NOT_FOUND));

    if (event.ownerId !== account.id)
      throw new RpcException(
        new ForbiddenException(YOU_ARE_NOT_OWNER_OF_THE_EVENT),
      );

    const users = await firstValueFrom(
      this.usersService.getAccountsByIds(
        event.invites.map((invite) => invite.receiverId),
      ),
    );

    return event.invites.map((invite) =>
      InviteMapper.requestToGetResponse(
        { ...invite, event },
        account,
        users.find((user) => user.id === invite.receiverId),
      ),
    );
  }
}

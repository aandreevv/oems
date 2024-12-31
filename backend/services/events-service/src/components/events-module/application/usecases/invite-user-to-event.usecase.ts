import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InviteRepositoryPort } from '../../ports/invite-repository.port';
import { UsersService } from '../../../../shared-module/secondary-adapters/services/users.service';
import { EventInviteResponse } from '../data/responses/event-invite.response';
import { InviteUserToEventRequest } from '../data/requests/invite-user-to-event.request';
import { EventRepositoryPort } from '../../ports/event-repository.port';
import { RpcException } from '@nestjs/microservices';
import {
  ACCOUNT_IS_NOT_FOUND,
  EVENT_IS_NOT_FOUND,
  ONLY_OWNER_CAN_INVITE_TO_EVENT,
  USER_IS_ALREADY_ATTENDEE_OF_THE_EVENT,
  USER_IS_ALREADY_INVITED_TO_THE_EVENT,
} from '../../../../constants/exceptions';
import { firstValueFrom } from 'rxjs';
import { InviteMapper } from '../data/mappers/invite.mapper';

@Injectable()
export class InviteUserToEvent {
  constructor(
    private readonly inviteRepository: InviteRepositoryPort,
    private readonly eventRepository: EventRepositoryPort,
    private readonly usersService: UsersService,
  ) {}

  async execute(body: InviteUserToEventRequest): Promise<EventInviteResponse> {
    const event = await this.eventRepository.findById(body.eventId, {
      invites: true,
      attendees: true,
    });

    if (!event)
      throw new RpcException(new NotFoundException(EVENT_IS_NOT_FOUND));

    if (body.sender.id !== event.ownerId)
      throw new RpcException(
        new ForbiddenException(ONLY_OWNER_CAN_INVITE_TO_EVENT),
      );

    if (event.invites.find((invite) => invite.receiverId === body.receiverId))
      throw new RpcException(
        new ConflictException(USER_IS_ALREADY_INVITED_TO_THE_EVENT),
      );

    if (
      event.ownerId === body.receiverId ||
      event.attendees.find((attendee) => attendee.accountId === body.receiverId)
    )
      throw new RpcException(
        new ConflictException(USER_IS_ALREADY_ATTENDEE_OF_THE_EVENT),
      );

    const receiver = await firstValueFrom(
      this.usersService.getAccountById(body.receiverId),
    );
    if (!receiver)
      throw new RpcException(new NotFoundException(ACCOUNT_IS_NOT_FOUND));

    const invite = await this.inviteRepository.create({
      event,
      sender: body.sender,
      receiver,
      inviteText: body.inviteText,
    });

    return InviteMapper.requestToGetResponse(invite, body.sender, receiver);
  }
}

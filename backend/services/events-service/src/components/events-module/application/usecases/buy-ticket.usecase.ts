import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EventRepositoryPort } from '../../ports/event-repository.port';
import { TicketRepositoryPort } from '../../ports/ticket-repository.port';
import { AppendAttendedUsers } from './append-attended-users.usecase';
import { TicketResponse } from '../data/responses/ticket.response';
import { BuyTicketRequest } from '../data/requests/buy-ticket.request';
import { RpcException } from '@nestjs/microservices';
import {
  EVENT_IS_FREE,
  EVENT_IS_NOT_FOUND,
  INSUFFICIENT_AMOUNT_OF_MONEY_TO_BUY_TICKET,
  USER_IS_ALREADY_ATTENDEE_OF_THE_EVENT,
  USER_IS_ALREADY_INVITED_TO_THE_EVENT,
} from '../../../../constants/exceptions';
import { firstValueFrom } from 'rxjs';
import { UsersService } from '../../../../shared-module/secondary-adapters/services/users.service';
import { TicketMapper } from '../data/mappers/ticket.mapper';

@Injectable()
export class BuyTicket {
  constructor(
    private readonly eventRepository: EventRepositoryPort,
    private readonly ticketRepository: TicketRepositoryPort,
    private readonly usersService: UsersService,
    private readonly appendAttendedUsers: AppendAttendedUsers,
  ) {}

  async execute(request: BuyTicketRequest): Promise<TicketResponse> {
    const event = await this.eventRepository.findById(request.eventId, {
      invites: true,
      attendees: true,
    });

    if (!event)
      throw new RpcException(new NotFoundException(EVENT_IS_NOT_FOUND));

    if (!event.paid && !event.price) {
      throw new RpcException(new ConflictException(EVENT_IS_FREE));
    }

    if (
      event.invites.find((invite) => invite.receiverId === request.account.id)
    )
      throw new RpcException(
        new ConflictException(USER_IS_ALREADY_INVITED_TO_THE_EVENT),
      );

    if (
      event.ownerId === request.account.id ||
      event.attendees.find(
        (attendee) => attendee.accountId === request.account.id,
      )
    )
      throw new RpcException(
        new ConflictException(USER_IS_ALREADY_ATTENDEE_OF_THE_EVENT),
      );

    if (event.price !== request.paid)
      throw new RpcException(
        new ForbiddenException(INSUFFICIENT_AMOUNT_OF_MONEY_TO_BUY_TICKET),
      );

    const ticket = await this.ticketRepository.create(event, request.account);
    await this.appendAttendedUsers.execute(request.account, event);

    const eventOwner = await firstValueFrom(
      this.usersService.getAccountById(event.ownerId),
    );

    return TicketMapper.requestToGetResponse(
      ticket,
      request.account,
      eventOwner,
    );
  }
}

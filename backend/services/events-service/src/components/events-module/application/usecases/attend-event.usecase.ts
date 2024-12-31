import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AttendeeRepositoryPort } from '../../ports/attendee-repository.port';
import { AccountInterface } from '../../../../shared-module/application/data/interfaces/account.interface';
import { EventRepositoryPort } from '../../ports/event-repository.port';
import { AttendEventRequest } from '../data/requests/attend-event.request';
import { RpcException } from '@nestjs/microservices';
import {
  EVENT_IS_NOT_FOUND,
  EVENT_IS_PAID,
  EVENT_IS_PRIVATE,
  USER_IS_ALREADY_ATTENDEE_OF_THE_EVENT,
} from '../../../../constants/exceptions';
import { UsersService } from '../../../../shared-module/secondary-adapters/services/users.service';
import { firstValueFrom } from 'rxjs';
import { EventAccessEnum } from '../data/enums/event-access.enum';
import { CommunicationService } from '../../../../shared-module/secondary-adapters/services/communication.service';

@Injectable()
export class AttendEvent {
  constructor(
    private readonly attendeeRepository: AttendeeRepositoryPort,
    private readonly eventRepository: EventRepositoryPort,
    private readonly usersService: UsersService,
    private readonly communicationService: CommunicationService,
  ) {}

  async execute(body: AttendEventRequest): Promise<AccountInterface[]> {
    const event = await this.eventRepository.findById(body.eventId, {
      attendees: true,
    });

    if (!event)
      throw new RpcException(new NotFoundException(EVENT_IS_NOT_FOUND));

    if (event.price)
      throw new RpcException(new BadRequestException(EVENT_IS_PAID));

    if (event.access === EventAccessEnum.PRIVATE)
      throw new RpcException(new ForbiddenException(EVENT_IS_PRIVATE));

    if (
      event.ownerId === body.account.id ||
      event.attendees.find((attendee) => attendee.accountId === body.account.id)
    )
      throw new RpcException(
        new ConflictException(USER_IS_ALREADY_ATTENDEE_OF_THE_EVENT),
      );

    const attendee = await this.attendeeRepository.create(event, body.account);
    await firstValueFrom(
      this.communicationService.joinRoom(body.account, event),
    );
    await firstValueFrom(
      this.communicationService.joinChat(body.account, event),
    );

    return firstValueFrom(
      this.usersService.getAccountsByIds(
        [...event.attendees, attendee].map((attendee) => attendee.accountId),
      ),
    );
  }
}

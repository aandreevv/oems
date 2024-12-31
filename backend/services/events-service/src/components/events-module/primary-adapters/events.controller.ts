import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateEvent } from '../application/usecases/create-event.usecase';
import { CreateEventRequest } from '../application/data/requests/create-event.request';
import { EventResponse } from '../application/data/responses/event.response';
import { AttendEventRequest } from '../application/data/requests/attend-event.request';
import { AccountInterface } from '../../../shared-module/application/data/interfaces/account.interface';
import { AttendEvent } from '../application/usecases/attend-event.usecase';
import { GetEventRequest } from '../application/data/requests/get-event.request';
import { GetEvent } from '../application/usecases/get-event.usecase';
import { GetEventAttendees } from '../application/usecases/get-event-attendees.usecase';
import { InviteUserToEventRequest } from '../application/data/requests/invite-user-to-event.request';
import { EventInviteResponse } from '../application/data/responses/event-invite.response';
import { InviteUserToEvent } from '../application/usecases/invite-user-to-event.usecase';
import { GetEventInvites } from '../application/usecases/get-event-invites.usecase';
import { GetAccountByIdRequest } from '../application/data/requests/get-account-by-id.request';
import { EventsAmountResponse } from '../application/data/responses/events-amount.response';
import { CountEventsByOwner } from '../application/usecases/count-events-by-owner.usecase';
import { GetUserEvents } from '../application/usecases/get-user-events.usecase';
import { PastAndFutureEventsResponse } from '../application/data/responses/past-and-future-events.response';
import { GetUserInvites } from '../application/usecases/get-user-invites.usecase';
import { GetUserAttendances } from '../application/usecases/get-user-attendances.usecase';
import { GetRecommendedEventsRequest } from '../application/data/requests/get-recommended-events.request';
import { GetRecommendedEvents } from '../application/usecases/get-recommended-events.usecase';
import { SetInviteStatusRequest } from '../application/data/requests/set-invite-status.request';
import { SetInviteStatus } from '../application/usecases/set-invite-status.usecase';
import { BuyTicket } from '../application/usecases/buy-ticket.usecase';
import { BuyTicketRequest } from '../application/data/requests/buy-ticket.request';
import { TicketResponse } from '../application/data/responses/ticket.response';
import { SearchEventsRequest } from '../application/data/requests/search-events.request';
import { SearchEvents } from '../application/usecases/search-events.usecase';

@Controller('events')
export class EventsController {
  constructor(
    private readonly createEventUsecase: CreateEvent,
    private readonly attendEventUsecase: AttendEvent,
    private readonly getEventUsecase: GetEvent,
    private readonly getEventAttendeesUsecase: GetEventAttendees,
    private readonly inviteUserToEventUsecase: InviteUserToEvent,
    private readonly getEventInvitesUsecase: GetEventInvites,
    private readonly countEventsByOwnerUsecase: CountEventsByOwner,
    private readonly getUserEventsUsecase: GetUserEvents,
    private readonly getUserInvitesUsecase: GetUserInvites,
    private readonly getUserAttendancesUsecase: GetUserAttendances,
    private readonly getRecommendedEventsUsecase: GetRecommendedEvents,
    private readonly setInviteStatusUsecase: SetInviteStatus,
    private readonly buyTicketUsecase: BuyTicket,
    private readonly searchEventsUsecase: SearchEvents,
  ) {}

  @MessagePattern('create-event')
  createEvent(@Payload() body: CreateEventRequest): Promise<EventResponse> {
    return this.createEventUsecase.execute(body);
  }

  @MessagePattern('attend_event')
  attendEvent(
    @Payload() body: AttendEventRequest,
  ): Promise<AccountInterface[]> {
    return this.attendEventUsecase.execute(body);
  }

  @MessagePattern('get_event')
  getEvent(@Payload() body: GetEventRequest): Promise<EventResponse> {
    return this.getEventUsecase.execute(body);
  }

  @MessagePattern('get_event_attendees')
  getEventAttendees(
    @Payload() body: GetEventRequest,
  ): Promise<AccountInterface[]> {
    return this.getEventAttendeesUsecase.execute(body);
  }

  @MessagePattern('invite_user')
  inviteUserToEvent(
    @Payload() body: InviteUserToEventRequest,
  ): Promise<EventInviteResponse> {
    return this.inviteUserToEventUsecase.execute(body);
  }

  @MessagePattern('get_event_invites')
  getEventInvites(
    @Payload() body: GetEventRequest,
  ): Promise<EventInviteResponse[]> {
    return this.getEventInvitesUsecase.execute(body);
  }

  @MessagePattern('count_events_by_owner')
  countEventsByOwner(
    @Payload() body: GetAccountByIdRequest,
  ): Promise<EventsAmountResponse> {
    return this.countEventsByOwnerUsecase.execute(body);
  }

  @MessagePattern('get_user_events')
  getUserEvents(
    @Payload() body: GetAccountByIdRequest,
  ): Promise<PastAndFutureEventsResponse> {
    return this.getUserEventsUsecase.execute(body);
  }

  @MessagePattern('get_user_invites')
  getUserInvites(
    @Payload() body: GetAccountByIdRequest,
  ): Promise<EventInviteResponse[]> {
    return this.getUserInvitesUsecase.execute(body);
  }

  @MessagePattern('get_user_attendances')
  getUserAttendances(
    @Payload() body: GetAccountByIdRequest,
  ): Promise<EventResponse[]> {
    return this.getUserAttendancesUsecase.execute(body);
  }

  @MessagePattern('get_recommended_events')
  getRecommendedEvents(): Promise<EventResponse[]> {
    return this.getRecommendedEventsUsecase.execute();
  }

  @MessagePattern('set_invite_status')
  setInviteStatus(
    @Payload() body: SetInviteStatusRequest,
  ): Promise<EventInviteResponse> {
    return this.setInviteStatusUsecase.execute(body);
  }

  @MessagePattern('buy_ticket')
  buyTicket(@Payload() body: BuyTicketRequest): Promise<TicketResponse> {
    return this.buyTicketUsecase.execute(body);
  }

  @MessagePattern('search_events')
  searchEvents(@Payload() body: SearchEventsRequest): Promise<EventResponse[]> {
    return this.searchEventsUsecase.execute(body);
  }
}

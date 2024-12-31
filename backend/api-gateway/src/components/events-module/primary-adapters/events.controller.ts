import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { EventsService } from '../../../shared-module/secondary-adapters/microservices/events.service';
import { CreateEventRequest } from '../application/data/requests/create-event.request';
import { Observable } from 'rxjs';
import { AuthenticatedUser } from '../../../shared-module/application/decorators/authenticated-user.decorator';
import { AuthGuard } from '../../auth-module/application/data/guards/auth.guard';
import { JWT_ACCESS_TOKEN } from 'src/constants/constants';
import { EventResponse } from '../application/data/responses/event.response';
import { AccountInterface } from '../../auth-module/application/data/interfaces/account.interface';
import { AccountResponse } from '../../users-module/application/data/responses/account.response';
import { GetEventRequest } from '../application/data/requests/get-event.request';
import {
  ACCOUNT_IS_NOT_FOUND,
  CAN_NOT_FIND_RECOMMENDED_EVENTS,
  EVENT_IS_FREE,
  EVENT_IS_NOT_FOUND,
  EVENT_IS_PAID,
  EVENT_IS_PRIVATE,
  INSUFFICIENT_AMOUNT_OF_MONEY_TO_BUY_TICKET,
  ONLY_OWNER_CAN_INVITE_TO_EVENT,
  USER_IS_ALREADY_ATTENDEE_OF_THE_EVENT,
  USER_IS_ALREADY_INVITED_TO_THE_EVENT,
  YOU_ARE_NOT_OWNER_OF_THE_EVENT,
} from '../../../constants/exceptions';
import { InviteUserToEventParamsRequest } from '../application/data/requests/invite-user-to-event.params.request';
import { InviteUserToEventBodyRequest } from '../application/data/requests/invite-user-to-event.body.request';
import { EventInviteReceiverResponse } from '../application/data/responses/event-invite-receiver.response';
import { TicketResponse } from '../application/data/responses/ticket.response';
import { BuyTicketRequest } from '../application/data/requests/buy-ticket.request';
import { SearchEventsRequest } from '../application/data/requests/search-events.request';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @ApiOperation({ description: 'Get recommended events. Pass access token' })
  @ApiOkResponse({ type: [EventResponse] })
  @ApiBadRequestResponse({ description: CAN_NOT_FIND_RECOMMENDED_EVENTS })
  @UseGuards(AuthGuard)
  @ApiBearerAuth(JWT_ACCESS_TOKEN)
  @HttpCode(HttpStatus.OK)
  @Get('recommended')
  getRecommendedEvents(@AuthenticatedUser() account: AccountInterface): Promise<EventResponse[]> {
    return this.eventsService.getRecommendedEvents(account);
  }

  @ApiOperation({
    description:
      'Create event request. Pass required data and access token. Event types: [ SPORTS, MUSIC, MOVIES_AND_TV_SHOWS, TRAVEL_AND_ADVENTURE, FOOD_AND_COOKING, TECHNOLOGY_AND_GADGETS, ART_AND_DESIGN, HEALTH_AND_FITNESS, LITERATURE_AND_WRITING, GAMING, FASHION_AND_BEAUTY, SCIENCE_AND_NATURE, DIY_AND_CRAFTS, POLITICS_AND_CURRENT_EVENTS, FINANCE_AND_INVESTING, PETS_AND_ANIMALS, CARS_AND_AUTOMOBILES, HISTORY, GARDENING, PHOTOGRAPHY, BLOGGING ]. Call types: ATTENDEE_CALL, CONSUME_ONLY_CALL',
  })
  @ApiCreatedResponse({ type: EventResponse })
  @UseGuards(AuthGuard)
  @ApiBearerAuth(JWT_ACCESS_TOKEN)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  createEvent(@Body() body: CreateEventRequest, @AuthenticatedUser() account: AccountInterface): Observable<EventResponse> {
    return this.eventsService.createEvent(body, account);
  }

  @ApiOperation({ description: 'Search events request. Pass name of the event and access token.' })
  @ApiOkResponse({ type: EventResponse })
  @ApiNotFoundResponse({ description: EVENT_IS_NOT_FOUND })
  @UseGuards(AuthGuard)
  @ApiBearerAuth(JWT_ACCESS_TOKEN)
  @HttpCode(HttpStatus.OK)
  @Get('search')
  searchEvents(@Query() param: SearchEventsRequest): Observable<EventResponse[]> {
    return this.eventsService.searchEvents(param);
  }

  @ApiOperation({ description: 'Get event request. Pass event id and access token.' })
  @ApiOkResponse({ type: EventResponse })
  @ApiNotFoundResponse({ description: EVENT_IS_NOT_FOUND })
  @UseGuards(AuthGuard)
  @ApiBearerAuth(JWT_ACCESS_TOKEN)
  @HttpCode(HttpStatus.OK)
  @Get(':eventId')
  getEvent(@Param() param: GetEventRequest): Observable<EventResponse> {
    return this.eventsService.getEvent(param);
  }

  @ApiOperation({ description: 'Get event attendees request. Pass event id and access token.' })
  @ApiOkResponse({ type: [AccountResponse] })
  @ApiNotFoundResponse({ description: EVENT_IS_NOT_FOUND })
  @UseGuards(AuthGuard)
  @ApiBearerAuth(JWT_ACCESS_TOKEN)
  @HttpCode(HttpStatus.OK)
  @Get(':eventId/attendees')
  getEventAttendees(@Param() param: GetEventRequest): Observable<EventResponse> {
    return this.eventsService.getEventAttendees(param);
  }

  @ApiOperation({
    description:
      'Attend event request. Pass event id and access token. Returns new list of attendees of the event. Send this request if the event is public',
  })
  @ApiOkResponse({ type: [AccountResponse] })
  @ApiNotFoundResponse({ description: EVENT_IS_NOT_FOUND })
  @ApiConflictResponse({ description: USER_IS_ALREADY_ATTENDEE_OF_THE_EVENT })
  @ApiBadRequestResponse({ description: EVENT_IS_PAID })
  @ApiForbiddenResponse({ description: EVENT_IS_PRIVATE })
  @UseGuards(AuthGuard)
  @ApiBearerAuth(JWT_ACCESS_TOKEN)
  @HttpCode(HttpStatus.OK)
  @Put(':eventId/attendees')
  attendEvent(@Param() param: GetEventRequest, @AuthenticatedUser() account: AccountInterface): Observable<AccountResponse[]> {
    return this.eventsService.attendEvent(param, account);
  }

  @ApiOperation({
    description:
      'Invite user to event request. Pass event id, receiver id and access token. Returns new invite instance. Send this request if your event is private and you wish to send invite request to someone. This user will receive your invite message.',
  })
  @ApiOkResponse({ type: EventInviteReceiverResponse })
  @ApiNotFoundResponse({ description: `${EVENT_IS_NOT_FOUND} or ${ACCOUNT_IS_NOT_FOUND}` })
  @ApiConflictResponse({ description: `${USER_IS_ALREADY_INVITED_TO_THE_EVENT} or ${USER_IS_ALREADY_ATTENDEE_OF_THE_EVENT}` })
  @ApiForbiddenResponse({ description: ONLY_OWNER_CAN_INVITE_TO_EVENT })
  @UseGuards(AuthGuard)
  @ApiBearerAuth(JWT_ACCESS_TOKEN)
  @HttpCode(HttpStatus.OK)
  @Put(':eventId/invites/:receiverId')
  inviteEvent(
    @Param() param: InviteUserToEventParamsRequest,
    @Body() body: InviteUserToEventBodyRequest,
    @AuthenticatedUser() account: AccountInterface,
  ): Observable<EventInviteReceiverResponse> {
    return this.eventsService.inviteUser(param, body, account);
  }

  @ApiOperation({ description: 'Get event invites request. Available only for owner of the event. Pass event id and access token' })
  @ApiOkResponse({ type: [EventInviteReceiverResponse] })
  @ApiNotFoundResponse({ description: EVENT_IS_NOT_FOUND })
  @ApiForbiddenResponse({ description: YOU_ARE_NOT_OWNER_OF_THE_EVENT })
  @UseGuards(AuthGuard)
  @ApiBearerAuth(JWT_ACCESS_TOKEN)
  @HttpCode(HttpStatus.OK)
  @Get(':eventId/invites')
  getEventInvites(
    @Param() param: GetEventRequest,
    @AuthenticatedUser() account: AccountInterface,
  ): Observable<EventInviteReceiverResponse[]> {
    return this.eventsService.getEventInvites(param, account);
  }

  @ApiOperation({ description: 'Buy ticket for the event. Pass event id, amount of paid money and access token' })
  @ApiOkResponse({ type: TicketResponse })
  @ApiNotFoundResponse({ description: EVENT_IS_NOT_FOUND })
  @ApiConflictResponse({ description: `${USER_IS_ALREADY_INVITED_TO_THE_EVENT} or ${EVENT_IS_FREE}` })
  @ApiForbiddenResponse({ description: INSUFFICIENT_AMOUNT_OF_MONEY_TO_BUY_TICKET })
  @UseGuards(AuthGuard)
  @ApiBearerAuth(JWT_ACCESS_TOKEN)
  @HttpCode(HttpStatus.OK)
  @Post(':eventId/tickets')
  buyTicket(
    @Param() param: GetEventRequest,
    @Body() body: BuyTicketRequest,
    @AuthenticatedUser() account: AccountInterface,
  ): Observable<TicketResponse> {
    return this.eventsService.buyTicket(param, body, account);
  }
}

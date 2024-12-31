import { Inject, Injectable } from '@nestjs/common';
import { EVENTS_SERVICE } from '../../../constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { GetAccountByIdRequest } from '../../../components/account-module/application/data/requests/get-account-by-id.request';
import { Observable } from 'rxjs';
import { EventsAmountResponse } from '../../application/responses/events-amount.response';

@Injectable()
export class EventsService {
  constructor(@Inject(EVENTS_SERVICE) private readonly eventsService: ClientProxy) {}

  countEventsByOwner(body: GetAccountByIdRequest): Observable<EventsAmountResponse> {
    return this.eventsService.send('count_events_by_owner', body);
  }
}

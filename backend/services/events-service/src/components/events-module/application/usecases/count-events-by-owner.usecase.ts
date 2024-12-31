import { Injectable } from '@nestjs/common';
import { EventRepositoryPort } from '../../ports/event-repository.port';
import { EventsAmountResponse } from '../data/responses/events-amount.response';
import { GetAccountByIdRequest } from '../data/requests/get-account-by-id.request';

@Injectable()
export class CountEventsByOwner {
  constructor(private readonly eventRepositoryPort: EventRepositoryPort) {}

  async execute({ id }: GetAccountByIdRequest): Promise<EventsAmountResponse> {
    const amount = await this.eventRepositoryPort.countByOwner(id);
    return { events: amount };
  }
}

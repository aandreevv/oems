import { Injectable, NotFoundException } from '@nestjs/common';
import { EventRepositoryPort } from '../../ports/event-repository.port';
import { EventResponse } from '../data/responses/event.response';
import { EventMapper } from '../data/mappers/event.mapper';
import { UsersService } from '../../../../shared-module/secondary-adapters/services/users.service';
import { GetAccountByIdRequest } from '../data/requests/get-account-by-id.request';
import { firstValueFrom } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { ACCOUNT_IS_NOT_FOUND } from '../../../../constants/exceptions';
import { PastAndFutureEventsResponse } from '../data/responses/past-and-future-events.response';

@Injectable()
export class GetUserEvents {
  constructor(
    private readonly eventRepository: EventRepositoryPort,
    private readonly usersService: UsersService,
  ) {}

  async execute({
    id,
  }: GetAccountByIdRequest): Promise<PastAndFutureEventsResponse> {
    const currentDate = new Date();

    const account = await firstValueFrom(this.usersService.getAccountById(id));
    if (!account)
      throw new RpcException(new NotFoundException(ACCOUNT_IS_NOT_FOUND));

    const events = (await this.eventRepository.findByOwner(account.id)).map(
      (event) => EventMapper.requestToGetResponse(event, account),
    );

    return {
      futureEvents: events.filter((event) => event.date > currentDate),
      pastEvents: events.filter((event) => event.date < currentDate),
    };
  }
}

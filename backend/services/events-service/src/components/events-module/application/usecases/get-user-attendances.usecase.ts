import { Injectable, NotFoundException } from '@nestjs/common';
import { AttendeeRepositoryPort } from '../../ports/attendee-repository.port';
import { GetAccountByIdRequest } from '../data/requests/get-account-by-id.request';
import { EventResponse } from '../data/responses/event.response';
import { firstValueFrom } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { ACCOUNT_IS_NOT_FOUND } from '../../../../constants/exceptions';
import { UsersService } from '../../../../shared-module/secondary-adapters/services/users.service';
import { EventMapper } from '../data/mappers/event.mapper';

@Injectable()
export class GetUserAttendances {
  constructor(
    private readonly attendeeRepository: AttendeeRepositoryPort,
    private readonly usersService: UsersService,
  ) {}

  async execute({ id }: GetAccountByIdRequest): Promise<EventResponse[]> {
    const user = await firstValueFrom(this.usersService.getAccountById(id));

    if (!user)
      throw new RpcException(new NotFoundException(ACCOUNT_IS_NOT_FOUND));

    const attendances = await this.attendeeRepository.findByAccount(id);

    const owners = await firstValueFrom(
      this.usersService.getAccountsByIds(
        attendances.map((attendance) => attendance.event.ownerId),
      ),
    );

    return attendances.map((attendance) =>
      EventMapper.requestToGetResponse(
        attendance.event,
        owners.find((owner) => owner.id === attendance.event.ownerId),
      ),
    );
  }
}

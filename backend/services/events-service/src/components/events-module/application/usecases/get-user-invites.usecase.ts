import { Injectable, NotFoundException } from '@nestjs/common';
import { InviteRepositoryPort } from '../../ports/invite-repository.port';
import { UsersService } from '../../../../shared-module/secondary-adapters/services/users.service';
import { firstValueFrom } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { ACCOUNT_IS_NOT_FOUND } from '../../../../constants/exceptions';
import { GetAccountByIdRequest } from '../data/requests/get-account-by-id.request';
import { EventInviteResponse } from '../data/responses/event-invite.response';
import { InviteMapper } from '../data/mappers/invite.mapper';

@Injectable()
export class GetUserInvites {
  constructor(
    private readonly inviteRepository: InviteRepositoryPort,
    private readonly usersService: UsersService,
  ) {}

  async execute({ id }: GetAccountByIdRequest): Promise<EventInviteResponse[]> {
    const receiver = await firstValueFrom(this.usersService.getAccountById(id));
    if (!receiver)
      throw new RpcException(new NotFoundException(ACCOUNT_IS_NOT_FOUND));

    const invites = await this.inviteRepository.findByAccount(receiver.id);

    const owners = await firstValueFrom(
      this.usersService.getAccountsByIds(
        invites.map((invite) => invite.senderId),
      ),
    );

    return invites.map((invite) =>
      InviteMapper.requestToGetResponse(
        invite,
        owners.find((owner) => owner.id === invite.senderId),
      ),
    );
  }
}

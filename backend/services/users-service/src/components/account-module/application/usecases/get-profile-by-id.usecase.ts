import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountRepositoryPort } from '../../ports/account-repository.port';
import { AccountResponse } from '../data/responses/account.response';
import { GetAccountByIdRequest } from '../data/requests/get-account-by-id.request';
import { RpcException } from '@nestjs/microservices';
import { ACCOUNT_IS_NOT_FOUND } from '../../../../exceptions';
import { FollowRepositoryPort } from '../../ports/follow-repository.port';
import { AccountMapper } from '../data/mappers/account.mapper';
import { firstValueFrom } from 'rxjs';
import { EventsService } from '../../../../shared-module/secondary-adapters/microservices/events.service';
import { ProfileRepositoryPort } from '../../ports/profile-repository.port';

@Injectable()
export class GetProfileById {
  constructor(
    private readonly accountRepository: AccountRepositoryPort,
    private readonly profileRepositoryPort: ProfileRepositoryPort,
    private readonly followRepositoryPort: FollowRepositoryPort,
    private readonly eventsService: EventsService,
  ) {}

  async execute({ id, account }: GetAccountByIdRequest): Promise<AccountResponse> {
    const foundAccount = await this.accountRepository.findById(id);
    if (!foundAccount) throw new RpcException(new NotFoundException(ACCOUNT_IS_NOT_FOUND));
    const followers = await this.followRepositoryPort.countFollowers(foundAccount.profile);
    const followings = await this.followRepositoryPort.countFollowings(foundAccount.profile);
    let followed: boolean;
    if (account && account.id !== foundAccount.id) {
      followed = false;
      const profile = await this.profileRepositoryPort.findByAccountId(account.id);
      const follow = await this.followRepositoryPort.findFollow(profile, foundAccount.profile);
      if (follow) followed = true;
    }
    const { events } = await firstValueFrom(this.eventsService.countEventsByOwner({ id }));
    return AccountMapper.requestToGetResponse(foundAccount, { followings, followers, events, followed });
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { FollowRepositoryPort } from '../../ports/follow-repository.port';
import { GetAccountByIdRequest } from '../data/requests/get-account-by-id.request';
import { AccountResponse } from '../data/responses/account.response';
import { ProfileRepositoryPort } from '../../ports/profile-repository.port';
import { AccountMapper } from '../data/mappers/account.mapper';
import { RpcException } from '@nestjs/microservices';
import { ACCOUNT_IS_NOT_FOUND } from '../../../../exceptions';

@Injectable()
export class GetUserFollowings {
  constructor(
    private readonly followRepositoryPort: FollowRepositoryPort,
    private readonly profileRepositoryPort: ProfileRepositoryPort,
  ) {}

  async execute({ id }: GetAccountByIdRequest): Promise<AccountResponse[]> {
    const profile = await this.profileRepositoryPort.findByAccountId(id);
    if (!profile) throw new RpcException(new NotFoundException(ACCOUNT_IS_NOT_FOUND));
    const follows = await this.followRepositoryPort.findUserFollowings(profile);
    return follows.map((follow) => AccountMapper.requestToGetResponseReversed(follow.following));
  }
}

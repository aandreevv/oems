import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { GetAccountByIdRequest } from '../data/requests/get-account-by-id.request';
import { AccountResponse } from '../data/responses/account.response';
import { RpcException } from '@nestjs/microservices';
import { ACCOUNT_IS_NOT_FOUND, CAN_NOT_FIND_RECOMMENDED_USERS } from '../../../../exceptions';
import { AccountRepositoryPort } from '../../ports/account-repository.port';
import { ProfileRepositoryPort } from '../../ports/profile-repository.port';
import { AccountMapper } from '../data/mappers/account.mapper';

@Injectable()
export class GetRecommendedUsers {
  constructor(private readonly profileRepository: ProfileRepositoryPort) {}

  async execute({ id }: GetAccountByIdRequest): Promise<AccountResponse[]> {
    const profile = await this.profileRepository.findByAccountId(id, { interests: true });
    if (!profile) throw new RpcException(new NotFoundException(ACCOUNT_IS_NOT_FOUND));
    const recommendedUsers = await this.profileRepository.findRecommended(profile);
    return recommendedUsers.map((item) => AccountMapper.requestToGetResponseReversed(item));
  }
}

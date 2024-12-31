import { Injectable, NotFoundException } from '@nestjs/common';
import { InterestRepositoryPort } from '../../ports/interest-repository.port';
import { GetAccountByIdRequest } from '../data/requests/get-account-by-id.request';
import { ProfileRepositoryPort } from '../../ports/profile-repository.port';
import { InterestResponse } from '../data/responses/interest.response';
import { ACCOUNT_IS_NOT_FOUND } from '../../../../exceptions';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class GetUserInterests {
  constructor(
    private readonly interestRepository: InterestRepositoryPort,
    private readonly profileRepository: ProfileRepositoryPort,
  ) {}

  async execute({ id }: GetAccountByIdRequest): Promise<InterestResponse[]> {
    const profile = await this.profileRepository.findByAccountId(id);
    if (!profile) throw new RpcException(new NotFoundException(ACCOUNT_IS_NOT_FOUND));
    return this.interestRepository.findUserInterests(profile);
  }
}

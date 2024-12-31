import { Injectable, NotFoundException } from '@nestjs/common';
import { InterestRepositoryPort } from '../../ports/interest-repository.port';
import { InterestResponse } from '../data/responses/interest.response';
import { CreateInterestRequest } from '../data/requests/create-interest.request';
import { ProfileRepositoryPort } from '../../ports/profile-repository.port';
import { ACCOUNT_IS_NOT_FOUND } from '../../../../exceptions';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AddUserInterest {
  constructor(
    private readonly interestRepository: InterestRepositoryPort,
    private readonly profileRepository: ProfileRepositoryPort,
  ) {}

  async execute(body: CreateInterestRequest): Promise<InterestResponse[]> {
    const profile = await this.profileRepository.findByAccountId(body.accountId);
    if (!profile) throw new RpcException(new NotFoundException(ACCOUNT_IS_NOT_FOUND));
    await this.interestRepository.create(body, profile);
    return this.interestRepository.findUserInterests(profile);
  }
}

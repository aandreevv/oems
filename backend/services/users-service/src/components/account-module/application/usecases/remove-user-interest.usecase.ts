import { Injectable, NotFoundException } from '@nestjs/common';
import { InterestRepositoryPort } from '../../ports/interest-repository.port';
import { GetInterestRequest } from '../data/requests/get-interest.request';
import { InterestResponse } from '../data/responses/interest.response';
import { INTEREST_IS_NOT_FOUND } from '../../../../exceptions';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class RemoveUserInterest {
  constructor(private readonly interestRepository: InterestRepositoryPort) {}

  async execute(body: GetInterestRequest): Promise<InterestResponse[]> {
    const interest = await this.interestRepository.findById(body.interestId);
    if (!interest) throw new RpcException(new NotFoundException(INTEREST_IS_NOT_FOUND));
    await this.interestRepository.delete(interest);
    return this.interestRepository.findUserInterests(interest.profile);
  }
}

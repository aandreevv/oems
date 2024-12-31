import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountRepositoryPort } from '../../ports/account-repository.port';
import { AccountResponse } from '../data/responses/account.response';
import { GetAccountByIdRequest } from '../data/requests/get-account-by-id.request';
import { AccountMapper } from '../data/mappers/account.mapper';
import { RpcException } from '@nestjs/microservices';
import { ACCOUNT_IS_NOT_FOUND } from '../../../../exceptions';

@Injectable()
export class GetAccountById {
  constructor(private readonly accountRepository: AccountRepositoryPort) {}

  async execute({ id }: GetAccountByIdRequest): Promise<AccountResponse> {
    const account = await this.accountRepository.findById(id);
    if (!account) throw new RpcException(new NotFoundException(ACCOUNT_IS_NOT_FOUND));
    return AccountMapper.requestToGetResponse(account);
  }
}

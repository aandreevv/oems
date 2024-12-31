import { Injectable } from '@nestjs/common';
import { AccountRepositoryPort } from '../../ports/account-repository.port';
import { GetAccountsByIdsRequest } from '../data/requests/get-accounts-by-ids.request';
import { AccountResponse } from '../data/responses/account.response';
import { AccountMapper } from '../data/mappers/account.mapper';

@Injectable()
export class GetAccountsByIds {
  constructor(private readonly accountRepository: AccountRepositoryPort) {}

  async execute({ ids }: GetAccountsByIdsRequest): Promise<AccountResponse[]> {
    const accounts = await this.accountRepository.findByIds(ids);
    return accounts.map((account) => AccountMapper.requestToGetResponse(account));
  }
}

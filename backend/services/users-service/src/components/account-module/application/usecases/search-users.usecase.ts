import { Injectable } from '@nestjs/common';
import { AccountRepositoryPort } from '../../ports/account-repository.port';
import { AccountResponse } from '../data/responses/account.response';
import { SearchUsersRequest } from '../data/requests/search-users.request';
import { AccountMapper } from '../data/mappers/account.mapper';

@Injectable()
export class SearchUsers {
  constructor(private readonly accountRepository: AccountRepositoryPort) {}

  async execute({ search, accountId }: SearchUsersRequest): Promise<AccountResponse[]> {
    const users = await this.accountRepository.searchUsers(search.toLowerCase(), accountId);
    return users.map((user) => AccountMapper.requestToGetResponse(user));
  }
}

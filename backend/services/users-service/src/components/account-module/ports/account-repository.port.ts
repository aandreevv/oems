import { AccountEntity } from '../application/data/entities/account.entity';
import { CreateAccountRequest } from '../application/data/requests/create-account.request';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';

export abstract class AccountRepositoryPort {
  abstract findByEmail(email: string): Promise<AccountEntity>;

  abstract findById(id: string, relations?: FindOptionsRelations<AccountEntity>): Promise<AccountEntity>;

  abstract save(createArgs: CreateAccountRequest): Promise<AccountEntity>;

  abstract searchUsers(search: string, accountId: string): Promise<AccountEntity[]>;

  abstract findByIds(ids: string[]): Promise<AccountEntity[]>;
}

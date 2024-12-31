import { AccountEntity } from '../../account-module/application/data/entities/account.entity';

export abstract class TokenRepositoryPort {
  abstract save(token: string, account: AccountEntity): Promise<void>;
  abstract delete(token: string, account: AccountEntity): Promise<void>;
}

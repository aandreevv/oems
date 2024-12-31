import { Inject, Injectable } from '@nestjs/common';
import { USERS_SERVICE } from '../../../constants/services';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, Observable } from 'rxjs';
import { AccountInterface } from '../../application/data/interfaces/account.interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_SERVICE) private readonly usersService: ClientProxy,
  ) {}

  getAccountById(id: string): Observable<AccountInterface> {
    return this.usersService
      .send<AccountInterface>('get_account_by_id', {
        id,
      })
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  getAccountsByIds(ids: string[]): Observable<AccountInterface[]> {
    return this.usersService
      .send<AccountInterface[]>('get_accounts_by_ids', {
        ids,
      })
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }
}

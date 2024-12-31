import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, Observable } from 'rxjs';
import { USERS_SERVICE } from '../../../constants/constants';
import { AccountInterface } from '../../../components/chats-module/application/data/interfaces/account.interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_SERVICE) private readonly usersService: ClientProxy,
  ) {}

  getAccountsByIds(ids: string[]): Observable<AccountInterface[]> {
    return this.usersService
      .send('get_accounts_by_ids', {
        ids,
      })
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }
}

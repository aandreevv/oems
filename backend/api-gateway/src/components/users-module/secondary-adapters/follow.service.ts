import { Inject, Injectable } from '@nestjs/common';
import { USERS_SERVICE } from '../../../constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { FollowRequest } from '../application/data/requests/follow.request';
import { AccountResponse } from '../application/data/responses/account.response';
import { catchError, Observable } from 'rxjs';
import { FollowResponse } from '../application/data/responses/follow.response';
import { ErrorHandlingFromMicroserviceService } from '@aandreevv/microservice-connection-lib';

@Injectable()
export class FollowService {
  constructor(
    @Inject(USERS_SERVICE) private readonly usersService: ClientProxy,
    private readonly errorHandlingFromMicroserviceService: ErrorHandlingFromMicroserviceService,
  ) {}

  follow({ userId }: FollowRequest, account: AccountResponse): Observable<FollowResponse> {
    return this.usersService
      .send<FollowResponse>('follow', { followingId: userId, followerId: account.id })
      .pipe(catchError((error) => this.errorHandlingFromMicroserviceService.handleError(error)));
  }

  unfollow({ userId }: FollowRequest, account: AccountResponse): Observable<FollowResponse> {
    return this.usersService
      .send<FollowResponse>('unfollow', { followingId: userId, followerId: account.id })
      .pipe(catchError((error) => this.errorHandlingFromMicroserviceService.handleError(error)));
  }

  getUserFollowers({ userId }: FollowRequest): Observable<AccountResponse[]> {
    return this.usersService
      .send<AccountResponse[]>('get_user_followers', { id: userId })
      .pipe(catchError((error) => this.errorHandlingFromMicroserviceService.handleError(error)));
  }

  getUserFollowings({ userId }: FollowRequest): Observable<AccountResponse[]> {
    return this.usersService
      .send<AccountResponse[]>('get_user_followings', { id: userId })
      .pipe(catchError((error) => this.errorHandlingFromMicroserviceService.handleError(error)));
  }
}

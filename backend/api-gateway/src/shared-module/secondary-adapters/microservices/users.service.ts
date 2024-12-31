import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { USERS_SERVICE } from '../../../constants/services';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CommunicationService } from './communication.service';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { SignUpRequest } from '../../../components/auth-module/application/data/requests/sign-up.request';
import { AuthTokensResponse } from '../../../components/auth-module/application/data/responses/auth-tokens.response';
import { SignedUpAccountResponse } from '../../../components/auth-module/application/data/types/signed-up-account.response';
import { SignInRequest } from '../../../components/auth-module/application/data/requests/sign-in.request';
import { AccountInterface } from '../../../components/auth-module/application/data/interfaces/account.interface';
import { RefreshTokensRequest } from '../../../components/auth-module/application/data/requests/refresh-tokens.request';
import { SetupProfileRequest } from '../../../components/auth-module/application/data/requests/setup-profile.request';
import { AccountResponse } from '../../../components/users-module/application/data/responses/account.response';
import { GetUserRequest } from '../../../components/users-module/application/data/requests/get-user.request';
import { AddConnectionRequest } from '../../../components/users-module/application/data/requests/add-connection.request';
import { ConnectionResponse } from '../../../components/users-module/application/data/responses/connection.response';
import { GetUserConnectionRequest } from '../../../components/users-module/application/data/requests/get-user-connection.request';
import { AddInterestsRequest } from '../../../components/users-module/application/data/requests/add-interests.request';
import { InterestResponse } from '../../../components/users-module/application/data/responses/interest.response';
import { GetUserInterestRequest } from '../../../components/users-module/application/data/requests/get-user-interest.request';
import { SearchUsersRequest } from '../../../components/users-module/application/data/requests/search-users.request';
import { AccountFullResponse } from '../../../components/users-module/application/data/responses/account-full.response';
import { EditProfileRequest } from '../../../components/users-module/application/data/requests/edit-profile.request';
import { ErrorHandlingFromMicroserviceService } from '@aandreevv/microservice-connection-lib';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_SERVICE) private readonly usersService: ClientProxy,
    private readonly communicationService: CommunicationService,
    private readonly errorHandlingFromMicroserviceService: ErrorHandlingFromMicroserviceService,
  ) {}

  private handleError(error: any): Observable<never> {
    return throwError(() => new RpcException(error.response));
  }

  signUp(body: SignUpRequest): Observable<AuthTokensResponse> {
    return this.usersService.send<SignedUpAccountResponse>('sign_up', body).pipe(
      map(({ accessToken, refreshToken }) => new AuthTokensResponse(accessToken, refreshToken)),
      catchError((error) => this.handleError(error)),
    );
  }

  signIn(body: SignInRequest): Observable<AuthTokensResponse> {
    return this.usersService.send<AuthTokensResponse>('sign_in', body).pipe(catchError((error) => this.handleError(error)));
  }

  verifyAccessToken(token: string): Observable<AccountInterface> {
    return this.usersService.send<AccountInterface>('verify_access_token', { token }).pipe(catchError((error) => this.handleError(error)));
  }

  refreshTokens(body: RefreshTokensRequest): Observable<AuthTokensResponse> {
    if (!body.authorization) throw new ForbiddenException();
    const [, token] = body.authorization.split(' ');
    return this.usersService.send<AuthTokensResponse>('refresh_tokens', { token }).pipe(catchError((error) => this.handleError(error)));
  }

  setupProfile(body: SetupProfileRequest, account: AccountResponse): Observable<AccountResponse> {
    return this.usersService.send<AccountResponse>('setup_profile', { ...body, accountId: account.id }).pipe(
      tap((response) => this.communicationService.sendAccountCreatedTrigger(response.id, response.profile.fullName)),
      catchError((error) => this.handleError(error)),
    );
  }

  getUser({ userId }: GetUserRequest): Observable<AccountResponse> {
    return this.usersService
      .send('get_account_by_id', { id: userId })
      .pipe(catchError((error) => this.errorHandlingFromMicroserviceService.handleError(error)));
  }

  addConnection(body: AddConnectionRequest, account: AccountResponse): Observable<ConnectionResponse[]> {
    return this.usersService
      .send<ConnectionResponse[]>('add_user_connection', { ...body, accountId: account.id })
      .pipe(catchError((error) => this.errorHandlingFromMicroserviceService.handleError(error)));
  }

  deleteConnection(body: GetUserConnectionRequest): Observable<ConnectionResponse[]> {
    return this.usersService
      .send<ConnectionResponse[]>('remove_user_connection', body)
      .pipe(catchError((error) => this.errorHandlingFromMicroserviceService.handleError(error)));
  }

  getUserConnections({ userId }: GetUserRequest): Observable<ConnectionResponse[]> {
    return this.usersService
      .send<ConnectionResponse[]>('get_user_connections', { id: userId })
      .pipe(catchError((error) => this.errorHandlingFromMicroserviceService.handleError(error)));
  }

  addInterest(body: AddInterestsRequest, account: AccountResponse): Observable<InterestResponse[]> {
    return this.usersService
      .send<InterestResponse[]>('add_user_interests', { ...body, accountId: account.id })
      .pipe(catchError((error) => this.errorHandlingFromMicroserviceService.handleError(error)));
  }

  deleteInterest(body: GetUserInterestRequest): Observable<InterestResponse[]> {
    return this.usersService
      .send<InterestResponse[]>('remove_user_interest', body)
      .pipe(catchError((error) => this.errorHandlingFromMicroserviceService.handleError(error)));
  }

  getUserInterests({ userId }: GetUserRequest): Observable<InterestResponse[]> {
    return this.usersService
      .send<InterestResponse[]>('get_user_interests', { id: userId })
      .pipe(catchError((error) => this.errorHandlingFromMicroserviceService.handleError(error)));
  }

  searchUsers(body: SearchUsersRequest, account: AccountResponse): Observable<AccountResponse[]> {
    return this.usersService
      .send('search_users', { ...body, accountId: account.id })
      .pipe(catchError((error) => this.errorHandlingFromMicroserviceService.handleError(error)));
  }

  uploadFile(file: Express.Multer.File, account: AccountInterface): Observable<AccountResponse> {
    return this.usersService
      .send('upload_profile_image', {
        file: { buffer: file.buffer, mimetype: file.mimetype, ext: file.originalname.split('.')[1] },
        accountId: account.id,
        type: 'users',
      })
      .pipe(catchError((error) => this.errorHandlingFromMicroserviceService.handleError(error)));
  }

  getProfile({ userId }: GetUserRequest, account?: AccountInterface): Observable<AccountFullResponse> {
    return this.usersService
      .send('get_profile_by_id', { id: userId, account })
      .pipe(catchError((error) => this.errorHandlingFromMicroserviceService.handleError(error)));
  }

  editProfile(body: EditProfileRequest, account: AccountInterface): Observable<AccountResponse> {
    return this.usersService
      .send('edit_profile', { accountId: account.id, profile: body })
      .pipe(catchError((error) => this.errorHandlingFromMicroserviceService.handleError(error)));
  }

  getRecommendedUsers(account: AccountInterface): Observable<AccountResponse[]> {
    return this.usersService
      .send('get_recommended_users', { id: account.id })
      .pipe(catchError((error) => this.errorHandlingFromMicroserviceService.handleError(error)));
  }
}

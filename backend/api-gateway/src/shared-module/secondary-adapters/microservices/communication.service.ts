import { BadRequestException, HttpException, Inject, Injectable } from '@nestjs/common';
import { AuthenticatedAccountResponse } from '../../../components/auth-module/application/data/responses/authenticated-account.response';
import { catchError, Observable } from 'rxjs';
import { CommunicationTokenResponse } from '../../../components/communication-module/application/data/responses/communication-token.response';
import { RoomResponse } from '../../../components/communication-module/application/data/responses/room.response';
import { COMMUNICATION_SERVICE } from '../../../constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { ChatResponse } from '../../../components/communication-module/application/data/responses/chat.response';
import { GetChatByIdRequest } from '../../../components/communication-module/application/data/requests/get-chat-by-id.request';
import { AccountResponse } from '../../../components/users-module/application/data/responses/account.response';
import { ErrorHandlingFromMicroserviceService } from '@aandreevv/microservice-connection-lib';

@Injectable()
export class CommunicationService {
  constructor(
    @Inject(COMMUNICATION_SERVICE) private readonly communicationService: ClientProxy,
    private readonly errorHandlingFromMicroserviceService: ErrorHandlingFromMicroserviceService,
  ) {}

  sendAccountCreatedTrigger(accountId: string, displayName?: string): Observable<void> {
    return this.communicationService
      .emit('account_created', { accountId, displayName })
      .pipe(catchError((error) => this.errorHandlingFromMicroserviceService.handleError(error)));
  }

  getCommunicationToken(account: AuthenticatedAccountResponse): Observable<CommunicationTokenResponse> {
    return this.communicationService
      .send('get-communication-token', { accountId: account.id })
      .pipe(catchError((error) => this.errorHandlingFromMicroserviceService.handleError(error)));
  }

  createRoom(account: AuthenticatedAccountResponse): Observable<RoomResponse> {
    return this.communicationService
      .send('create-call-room', { accountId: account.id })
      .pipe(catchError((error) => this.errorHandlingFromMicroserviceService.handleError(error)));
  }

  getUserChats(account: AuthenticatedAccountResponse): Observable<ChatResponse[]> {
    return this.communicationService
      .send('get_user_chats', { accountId: account.id })
      .pipe(catchError((error) => this.errorHandlingFromMicroserviceService.handleError(error)));
  }

  getChatParticipants(body: GetChatByIdRequest): Observable<AccountResponse[]> {
    return this.communicationService.send('get_chat_participants', body).pipe(
      catchError((error) => {
        throw new HttpException(error.response, error.status);
      }),
    );
  }
}

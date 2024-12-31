import { Inject, Injectable } from '@nestjs/common';
import { COMMUNICATION_SERVICE } from '../../../constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { RoomResponse } from '../../../components/events-module/application/data/responses/room.response';
import { AccountInterface } from '../../application/data/interfaces/account.interface';
import { EventEntity } from '../../../components/events-module/application/data/entities/event.entity';
import { EventTypeEnum } from '../../../components/events-module/application/data/enums/event-type.enum';
import { ChatResponse } from '../../../components/events-module/application/data/responses/chat.response';

@Injectable()
export class CommunicationService {
  constructor(
    @Inject(COMMUNICATION_SERVICE)
    private readonly communicationService: ClientProxy,
  ) {}

  createRoom(date: Date): Observable<RoomResponse> {
    return this.communicationService.send('create-call-room', { date });
  }

  joinRoom(
    account: AccountInterface,
    event: EventEntity,
  ): Observable<RoomResponse> {
    return this.communicationService.send('join-call-room', {
      accountId: account.id,
      roomId: event.roomId,
      role:
        event.ownerId === account.id
          ? 'Presenter'
          : event.type === EventTypeEnum.ATTENDEE_CALL
            ? 'Attendee'
            : 'Consumer',
    });
  }

  createChat(
    account: AccountInterface,
    topic: string,
  ): Observable<ChatResponse> {
    return this.communicationService.send('create_chat', {
      accountId: account.id,
      topic,
    });
  }

  joinChat(
    account: AccountInterface,
    event: EventEntity,
  ): Observable<ChatResponse> {
    return this.communicationService.send('join_chat', {
      accountId: account.id,
      chatId: event.chatId,
      identityId: event.ownerId,
    });
  }
}

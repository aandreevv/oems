import { Module } from '@nestjs/common';
import { ChatRepositoryPort } from './ports/chat-repository.port';
import { PostgresChatRepositoryAdapter } from './secondary-adapters/postgres-chat-repository.adapter';
import { ChatParticipantRepositoryPort } from './ports/chat-participant-repository.port';
import { PostgresChatParticipantRepositoryAdapter } from './secondary-adapters/postgres-chat-participant-repository.adapter';
import { CreateChat } from './application/usecases/create-chat.usecase';
import { IdentityModule } from '../identity-module/identity.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatEntity } from './application/data/entities/chat.entity';
import { ChatParticipantEntity } from './application/data/entities/chat-participant.entity';
import { ChatServicePort } from './ports/chat-service.port';
import { AzureChatServiceAdapter } from './secondary-adapters/azure-chat-service.adapter';
import { RemoveFromChat } from './application/usecases/remove-from-chat.usecase';
import { JoinChat } from './application/usecases/join-chat.usecase';
import { SharedModule } from '../../shared-module/shared.module';
import { GetChatParticipants } from './application/usecases/get-chat-participants.usecase';
import { GetUserChats } from './application/usecases/get-user-chats.usecase';
import { ChatController } from './primary-adapters/chat.controller';

@Module({
  exports: [],
  imports: [
    SharedModule,
    TypeOrmModule.forFeature([ChatEntity, ChatParticipantEntity]),
    IdentityModule,
  ],
  providers: [
    {
      provide: ChatRepositoryPort,
      useClass: PostgresChatRepositoryAdapter,
    },
    {
      provide: ChatParticipantRepositoryPort,
      useClass: PostgresChatParticipantRepositoryAdapter,
    },
    {
      provide: ChatServicePort,
      useClass: AzureChatServiceAdapter,
    },
    CreateChat,
    RemoveFromChat,
    JoinChat,
    GetChatParticipants,
    GetUserChats,
  ],
  controllers: [ChatController],
})
export class ChatsModule {}

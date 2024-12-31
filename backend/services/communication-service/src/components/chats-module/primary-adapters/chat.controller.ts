import { Controller } from '@nestjs/common';
import { CreateChat } from '../application/usecases/create-chat.usecase';
import { JoinChat } from '../application/usecases/join-chat.usecase';
import { GetUserChats } from '../application/usecases/get-user-chats.usecase';
import { GetChatParticipants } from '../application/usecases/get-chat-participants.usecase';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ChatResponse } from '../application/data/responses/chat.response';
import { CreateChatRequest } from '../application/data/requests/create-chat.request';
import { ChatParticipationRequest } from '../application/data/requests/chat-participation.request';
import { RemoveFromChat } from '../application/usecases/remove-from-chat.usecase';
import { GetChatRequest } from '../application/data/requests/get-chat.request';
import { AccountInterface } from '../application/data/interfaces/account.interface';
import { GetUserChatsRequest } from '../application/data/requests/get-user-chats.request';

@Controller('chats')
export class ChatController {
  constructor(
    private readonly createChatUsecase: CreateChat,
    private readonly joinChatUsecase: JoinChat,
    private readonly removeFromChatUsecase: RemoveFromChat,
    private readonly getUserChatsUsecase: GetUserChats,
    private readonly getChatParticipantsUsecase: GetChatParticipants,
  ) {}

  @MessagePattern('create_chat')
  createChat(@Payload() body: CreateChatRequest): Promise<ChatResponse> {
    return this.createChatUsecase.execute(body);
  }

  @MessagePattern('join_chat')
  joinChat(@Payload() body: ChatParticipationRequest): Promise<ChatResponse> {
    return this.joinChatUsecase.execute(body);
  }

  @MessagePattern('remove_from_chat')
  removeFromChat(
    @Payload() body: ChatParticipationRequest,
  ): Promise<ChatResponse> {
    return this.removeFromChatUsecase.execute(body);
  }

  @MessagePattern('get_chat_participants')
  getChatParticipants(
    @Payload() body: GetChatRequest,
  ): Promise<AccountInterface[]> {
    return this.getChatParticipantsUsecase.execute(body);
  }

  @MessagePattern('get_user_chats')
  getUserChats(@Payload() body: GetUserChatsRequest): Promise<ChatResponse[]> {
    return this.getUserChatsUsecase.execute(body);
  }
}

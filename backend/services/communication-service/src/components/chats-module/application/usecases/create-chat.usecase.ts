import { Injectable } from '@nestjs/common';
import { ChatRepositoryPort } from '../../ports/chat-repository.port';
import { ChatServicePort } from '../../ports/chat-service.port';
import { CreateChatRequest } from '../data/requests/create-chat.request';
import { CommunicationIdentityRepositoryPort } from '../../../identity-module/ports/communication-identity-repository.port';
import { ChatParticipantRepositoryPort } from '../../ports/chat-participant-repository.port';
import { ChatMapper } from '../data/mappers/chat.mapper';
import { ChatResponse } from '../data/responses/chat.response';

@Injectable()
export class CreateChat {
  constructor(
    private readonly chatService: ChatServicePort,
    private readonly chatRepository: ChatRepositoryPort,
    private readonly chatParticipantRepository: ChatParticipantRepositoryPort,
    private readonly communicationIdentityRepository: CommunicationIdentityRepositoryPort,
  ) {}

  async execute({
    image,
    accountId,
    topic,
  }: CreateChatRequest): Promise<ChatResponse> {
    const identity =
      await this.communicationIdentityRepository.findByAccount(accountId);
    const chat = await this.chatService.createThread({ identity, topic });
    await this.chatService.joinThread({
      participant: identity,
      threadId: chat.id,
      identity,
    });
    const chatEntity = await this.chatRepository.create(chat.id, topic, image);
    await this.chatParticipantRepository.joinRoom(identity, chatEntity);
    return ChatMapper.requestToGetResponse(chatEntity);
  }
}

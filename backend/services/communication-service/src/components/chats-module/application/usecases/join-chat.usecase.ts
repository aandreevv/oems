import { Injectable } from '@nestjs/common';
import { ChatParticipantRepositoryPort } from '../../ports/chat-participant-repository.port';
import { ChatServicePort } from '../../ports/chat-service.port';
import { ChatParticipationRequest } from '../data/requests/chat-participation.request';
import { CommunicationIdentityRepositoryPort } from '../../../identity-module/ports/communication-identity-repository.port';
import { ChatRepositoryPort } from '../../ports/chat-repository.port';
import { ChatResponse } from '../data/responses/chat.response';
import { ChatMapper } from '../data/mappers/chat.mapper';

@Injectable()
export class JoinChat {
  constructor(
    private readonly chatParticipantRepository: ChatParticipantRepositoryPort,
    private readonly chatRepositoryPort: ChatRepositoryPort,
    private readonly communicationIdentityRepository: CommunicationIdentityRepositoryPort,
    private readonly chatService: ChatServicePort,
  ) {}

  async execute({
    chatId,
    accountId,
    identityId,
  }: ChatParticipationRequest): Promise<ChatResponse> {
    const participant =
      await this.communicationIdentityRepository.findByAccount(accountId);
    const identity =
      await this.communicationIdentityRepository.findByAccount(identityId);
    const chat = await this.chatRepositoryPort.findByThreadId(chatId);
    await this.chatService.joinThread({
      threadId: chat.threadId,
      participant,
      identity,
    });
    await this.chatParticipantRepository.joinRoom(participant, chat);
    return ChatMapper.requestToGetResponse(chat);
  }
}

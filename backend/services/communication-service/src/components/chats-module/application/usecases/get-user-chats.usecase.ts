import { Injectable, NotFoundException } from '@nestjs/common';
import { ChatParticipantRepositoryPort } from '../../ports/chat-participant-repository.port';
import { ChatResponse } from '../data/responses/chat.response';
import { CommunicationIdentityRepositoryPort } from '../../../identity-module/ports/communication-identity-repository.port';
import { GetUserChatsRequest } from '../data/requests/get-user-chats.request';
import { RpcException } from '@nestjs/microservices';
import { ACCOUNT_NOT_FOUND } from '../../../../constants/exceptions';
import { ChatMapper } from '../data/mappers/chat.mapper';

@Injectable()
export class GetUserChats {
  constructor(
    private readonly communicationIdentityRepository: CommunicationIdentityRepositoryPort,
    private readonly chatParticipantRepository: ChatParticipantRepositoryPort,
  ) {}

  async execute({ accountId }: GetUserChatsRequest): Promise<ChatResponse[]> {
    const identity =
      await this.communicationIdentityRepository.findByAccount(accountId);
    if (!identity)
      throw new RpcException(new NotFoundException(ACCOUNT_NOT_FOUND));
    const chatParticipation =
      await this.chatParticipantRepository.findIdentityChats(identity);
    return chatParticipation.map((item) =>
      ChatMapper.requestToGetResponse(item.chat),
    );
  }
}

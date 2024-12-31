import { Injectable, NotFoundException } from '@nestjs/common';
import { ChatParticipantRepositoryPort } from '../../ports/chat-participant-repository.port';
import { ChatRepositoryPort } from '../../ports/chat-repository.port';
import { UsersService } from '../../../../shared-module/secondary-adapters/services/users.service';
import { AccountInterface } from '../data/interfaces/account.interface';
import { GetChatRequest } from '../data/requests/get-chat.request';
import { RpcException } from '@nestjs/microservices';
import { CHAT_IS_NOT_FOUND } from '../../../../constants/exceptions';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GetChatParticipants {
  constructor(
    private readonly chatRepository: ChatRepositoryPort,
    private readonly chatParticipantRepository: ChatParticipantRepositoryPort,
    private readonly usersService: UsersService,
  ) {}

  async execute({ chatId }: GetChatRequest): Promise<AccountInterface[]> {
    const chat = await this.chatRepository.findById(chatId);
    if (!chat) throw new RpcException(new NotFoundException(CHAT_IS_NOT_FOUND));

    const participants =
      await this.chatParticipantRepository.findParticipants(chat);

    return firstValueFrom(
      this.usersService.getAccountsByIds(
        participants.map((participant) => participant.identity.accountId),
      ),
    );
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatParticipantEntity } from '../application/data/entities/chat-participant.entity';
import { ChatParticipantRepositoryPort } from '../ports/chat-participant-repository.port';
import { CommunicationIdentity } from 'src/components/identity-module/application/data/entities/communication-identity.entity';
import { ChatEntity } from '../application/data/entities/chat.entity';

@Injectable()
export class PostgresChatParticipantRepositoryAdapter
  implements ChatParticipantRepositoryPort
{
  constructor(
    @InjectRepository(ChatParticipantEntity)
    private readonly chatParticipantEntityRepository: Repository<ChatParticipantEntity>,
  ) {}

  findIdentityChats(
    identity: CommunicationIdentity,
  ): Promise<ChatParticipantEntity[]> {
    return this.chatParticipantEntityRepository.find({
      where: { identity: { id: identity.id } },
      relations: { chat: true },
    });
  }

  findParticipants(chat: ChatEntity): Promise<ChatParticipantEntity[]> {
    return this.chatParticipantEntityRepository.find({
      where: { chat: { id: chat.id } },
      relations: { identity: true },
    });
  }

  joinRoom(
    identity: CommunicationIdentity,
    chat: ChatEntity,
  ): Promise<ChatParticipantEntity> {
    return this.chatParticipantEntityRepository.save({ identity, chat });
  }

  async removeFromRoom(
    identity: CommunicationIdentity,
    chat: ChatEntity,
  ): Promise<void> {
    await this.chatParticipantEntityRepository.delete({ chat, identity });
  }
}

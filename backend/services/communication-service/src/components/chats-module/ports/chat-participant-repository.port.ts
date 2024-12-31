import { ChatParticipantEntity } from '../application/data/entities/chat-participant.entity';
import { CommunicationIdentity } from '../../identity-module/application/data/entities/communication-identity.entity';
import { ChatEntity } from '../application/data/entities/chat.entity';

export abstract class ChatParticipantRepositoryPort {
  abstract joinRoom(
    identity: CommunicationIdentity,
    chat: ChatEntity,
  ): Promise<ChatParticipantEntity>;

  abstract removeFromRoom(
    identity: CommunicationIdentity,
    chat: ChatEntity,
  ): Promise<void>;

  abstract findParticipants(chat: ChatEntity): Promise<ChatParticipantEntity[]>;

  abstract findIdentityChats(
    identity: CommunicationIdentity,
  ): Promise<ChatParticipantEntity[]>;
}

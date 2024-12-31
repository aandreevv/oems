import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CommunicationIdentity } from '../../../../identity-module/application/data/entities/communication-identity.entity';
import { ChatEntity } from './chat.entity';

@Entity()
export class ChatParticipantEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => CommunicationIdentity, (identity) => identity.chats)
  identity: CommunicationIdentity;

  @ManyToOne(() => ChatEntity, (chat) => chat.participants)
  chat: ChatEntity;
}

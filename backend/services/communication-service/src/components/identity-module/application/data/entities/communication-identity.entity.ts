import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CallParticipantEntity } from '../../../../rooms-module/application/data/entities/call-participant.entity';
import { ChatEntity } from '../../../../chats-module/application/data/entities/chat.entity';
import { ChatParticipantEntity } from '../../../../chats-module/application/data/entities/chat-participant.entity';

@Entity()
export class CommunicationIdentity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  accountId: string;

  @Column()
  identityId: string;

  @OneToMany(
    () => CallParticipantEntity,
    (callParticipant) => callParticipant.identity,
    { onDelete: 'CASCADE' },
  )
  calls: CallParticipantEntity[];

  @OneToMany(() => ChatParticipantEntity, (chat) => chat.identity, {
    onDelete: 'CASCADE',
  })
  chats: ChatParticipantEntity[];

  @Column({ nullable: true })
  displayName?: string;
}

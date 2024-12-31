import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChatParticipantEntity } from './chat-participant.entity';

@Entity()
export class ChatEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  threadId: string;

  @Column()
  topic: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  image?: string;

  @OneToMany(() => ChatParticipantEntity, (participant) => participant.chat, {
    onDelete: 'CASCADE',
  })
  participants: ChatParticipantEntity[];
}

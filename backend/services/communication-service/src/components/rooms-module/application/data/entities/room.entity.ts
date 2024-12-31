import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CallParticipantEntity } from './call-participant.entity';

@Entity()
export class RoomEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  roomId: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  validFrom: Date;

  @Column()
  validUntil: Date;

  @OneToMany(() => CallParticipantEntity, (participant) => participant.room, {
    onDelete: 'CASCADE',
  })
  participants: CallParticipantEntity[];
}

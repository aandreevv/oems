import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CommunicationIdentity } from '../../../../identity-module/application/data/entities/communication-identity.entity';
import { RoomEntity } from './room.entity';

@Entity()
export class CallParticipantEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => RoomEntity, (room) => room.participants)
  room: RoomEntity;

  @ManyToOne(() => CommunicationIdentity, (identity) => identity.calls)
  identity: CommunicationIdentity;
}

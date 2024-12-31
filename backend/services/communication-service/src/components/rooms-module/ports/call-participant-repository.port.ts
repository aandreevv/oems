import { CommunicationIdentity } from '../../identity-module/application/data/entities/communication-identity.entity';
import { CallParticipantEntity } from '../application/data/entities/call-participant.entity';
import { RoomEntity } from '../application/data/entities/room.entity';

export abstract class CallParticipantRepositoryPort {
  abstract addParticipantToRoom(
    identity: CommunicationIdentity,
    room: RoomEntity,
  ): Promise<CallParticipantEntity>;
}

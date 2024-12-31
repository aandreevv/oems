import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CallParticipantEntity } from '../application/data/entities/call-participant.entity';
import { Repository } from 'typeorm';
import { CallParticipantRepositoryPort } from '../ports/call-participant-repository.port';
import { CommunicationIdentity } from 'src/components/identity-module/application/data/entities/communication-identity.entity';
import { RoomEntity } from '../application/data/entities/room.entity';

@Injectable()
export class PostgresCallParticipantRepositoryAdapter
  implements CallParticipantRepositoryPort
{
  constructor(
    @InjectRepository(CallParticipantEntity)
    private readonly callParticipantRepository: Repository<CallParticipantEntity>,
  ) {}

  addParticipantToRoom(
    identity: CommunicationIdentity,
    room: RoomEntity,
  ): Promise<CallParticipantEntity> {
    return this.callParticipantRepository.save({ room, identity });
  }
}

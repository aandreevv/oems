import { Module } from '@nestjs/common';
import { RoomController } from './primary-adapters/room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomEntity } from './application/data/entities/room.entity';
import { CallRoomServicePort } from './ports/call-room-service.port';
import { AzureCallRoomServiceAdapter } from './secondary-adapters/azure-call-room-service.adapter';
import { RoomRepositoryPort } from './ports/room-repository.port';
import { PostgresRoomRepositoryAdapter } from './secondary-adapters/postgres-room-repository.adapter';
import { IdentityModule } from '../identity-module/identity.module';
import { CreateRoom } from './application/usecases/create-room.usecase';
import { JoinRoom } from './application/usecases/join-room.usecase';
import { CallParticipantRepositoryPort } from './ports/call-participant-repository.port';
import { PostgresCallParticipantRepositoryAdapter } from './secondary-adapters/postgres-call-participant-repository.adapter';
import { CallParticipantEntity } from './application/data/entities/call-participant.entity';

@Module({
  exports: [
    CallRoomServicePort,
    RoomRepositoryPort,
    CallParticipantRepositoryPort,
  ],
  imports: [
    TypeOrmModule.forFeature([RoomEntity, CallParticipantEntity]),
    IdentityModule,
  ],
  providers: [
    { provide: CallRoomServicePort, useClass: AzureCallRoomServiceAdapter },
    { provide: RoomRepositoryPort, useClass: PostgresRoomRepositoryAdapter },
    {
      provide: CallParticipantRepositoryPort,
      useClass: PostgresCallParticipantRepositoryAdapter,
    },
    CreateRoom,
    JoinRoom,
  ],
  controllers: [RoomController],
})
export class RoomsModule {}

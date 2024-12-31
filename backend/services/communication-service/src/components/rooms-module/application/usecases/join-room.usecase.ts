import { Injectable } from '@nestjs/common';
import { CallRoomServicePort } from '../../ports/call-room-service.port';
import { RoomRepositoryPort } from '../../ports/room-repository.port';
import { JoinRoomRequest } from '../data/requests/join-room.request';
import { CommunicationIdentityRepositoryPort } from '../../../identity-module/ports/communication-identity-repository.port';
import { RoomResponse } from '../data/responses/room.response';
import { CallRoomMapper } from '../data/mappers/call-room.mapper';
import { CallParticipantRepositoryPort } from '../../ports/call-participant-repository.port';

@Injectable()
export class JoinRoom {
  constructor(
    private readonly callRoomService: CallRoomServicePort,
    private readonly roomRepository: RoomRepositoryPort,
    private readonly communicationIdentityRepository: CommunicationIdentityRepositoryPort,
    private readonly callParticipantRepository: CallParticipantRepositoryPort,
  ) {}

  async execute(requestArgs: JoinRoomRequest): Promise<RoomResponse> {
    const identity = await this.communicationIdentityRepository.findByAccount(
      requestArgs.accountId,
    );
    const room = await this.roomRepository.findByRoomId(requestArgs.roomId);
    await this.callRoomService.join(
      room.roomId,
      identity.identityId,
      requestArgs.role,
    );
    await this.callParticipantRepository.addParticipantToRoom(identity, room);
    return room;
  }
}

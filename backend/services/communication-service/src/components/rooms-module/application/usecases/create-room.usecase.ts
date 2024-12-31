import { Injectable } from '@nestjs/common';
import { CallRoomServicePort } from '../../ports/call-room-service.port';
import { RoomRepositoryPort } from '../../ports/room-repository.port';
import { CallRoomMapper } from '../data/mappers/call-room.mapper';
import { RoomResponse } from '../data/responses/room.response';
import { CreateRoomRequest } from '../data/requests/create-room.request';

@Injectable()
export class CreateRoom {
  constructor(
    private readonly callRoomService: CallRoomServicePort,
    private readonly roomRepository: RoomRepositoryPort,
  ) {}

  async execute({ date }: CreateRoomRequest): Promise<RoomResponse> {
    const validFrom = new Date(date);
    validFrom.setHours(validFrom.getHours() - 5);

    const validUntil = new Date(date);
    validUntil.setHours(validUntil.getHours() + 5);

    const createdRoom = await this.callRoomService.create({
      validFrom,
      validUntil,
    });

    return this.roomRepository.create(
      CallRoomMapper.requestToEntity(createdRoom),
    );
  }
}

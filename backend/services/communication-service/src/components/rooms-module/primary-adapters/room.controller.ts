import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateRoom } from '../application/usecases/create-room.usecase';
import { RoomResponse } from '../application/data/responses/room.response';
import { JoinRoomRequest } from '../application/data/requests/join-room.request';
import { JoinRoom } from '../application/usecases/join-room.usecase';
import { CreateRoomRequest } from '../application/data/requests/create-room.request';

@Controller('rooms')
export class RoomController {
  constructor(
    private readonly createRoomUsecase: CreateRoom,
    private readonly joinRoomUsecase: JoinRoom,
  ) {}

  @MessagePattern('create-call-room')
  createRoom(@Payload() body: CreateRoomRequest): Promise<RoomResponse> {
    return this.createRoomUsecase.execute(body);
  }

  @EventPattern('join-call-room')
  joinRoom(@Payload() body: JoinRoomRequest): Promise<RoomResponse> {
    return this.joinRoomUsecase.execute(body);
  }
}

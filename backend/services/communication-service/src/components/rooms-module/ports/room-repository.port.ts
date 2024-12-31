import { RoomEntity } from '../application/data/entities/room.entity';

export abstract class RoomRepositoryPort {
  abstract create(entity: RoomEntity): Promise<RoomEntity>;
  abstract findById(id: string): Promise<RoomEntity>;
  abstract findByRoomId(roomId: string): Promise<RoomEntity>;
}

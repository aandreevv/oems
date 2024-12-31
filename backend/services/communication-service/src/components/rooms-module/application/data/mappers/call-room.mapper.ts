import { RoomEntity } from '../entities/room.entity';
import { CallRoomType } from '../types/call-room.type';

export class CallRoomMapper {
  static requestToEntity(room: CallRoomType): RoomEntity {
    const entity = new RoomEntity();
    entity.roomId = room.id;
    entity.validFrom = room.validFrom;
    entity.validUntil = room.validUntil;
    return entity;
  }
}

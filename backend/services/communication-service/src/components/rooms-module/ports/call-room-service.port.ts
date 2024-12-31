import { CallRoomType } from '../application/data/types/call-room.type';
import { RoomTimeRangesType } from '../application/data/types/room-time-ranges.type';
import { CallParticipantRoleEnum } from '../application/data/enums/call-participant-role.enum';

export abstract class CallRoomServicePort {
  abstract create(dates: RoomTimeRangesType): Promise<CallRoomType>;
  abstract join(
    roomId: string,
    participantId: string,
    role: CallParticipantRoleEnum,
  ): Promise<void>;
}

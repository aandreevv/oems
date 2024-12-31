import { Injectable } from '@nestjs/common';
import { RoomsClient } from '@azure/communication-rooms';
import { ConfigService } from '@nestjs/config';
import { CallRoomServicePort } from '../ports/call-room-service.port';
import { CallRoomType } from '../application/data/types/call-room.type';
import { RoomTimeRangesType } from '../application/data/types/room-time-ranges.type';
import { CallParticipantRoleEnum } from '../application/data/enums/call-participant-role.enum';

@Injectable()
export class AzureCallRoomServiceAdapter implements CallRoomServicePort {
  private readonly roomsClient: RoomsClient;

  constructor(private readonly configService: ConfigService) {
    this.roomsClient = new RoomsClient(
      this.configService.get('azureCommunicationConnectionString'),
    );
  }

  create({ validFrom, validUntil }: RoomTimeRangesType): Promise<CallRoomType> {
    return this.roomsClient.createRoom({ validFrom, validUntil });
  }

  join(
    roomId: string,
    participantId: string,
    role = CallParticipantRoleEnum.ATTENDEE,
  ): Promise<void> {
    return this.roomsClient.addOrUpdateParticipants(roomId, [
      { id: { communicationUserId: participantId }, role },
    ]);
  }
}

import { ApiProperty } from '@nestjs/swagger';

export class GetRoomByIdRequest {
  @ApiProperty({ description: 'Room of existing id in database' })
  roomId: string;
}

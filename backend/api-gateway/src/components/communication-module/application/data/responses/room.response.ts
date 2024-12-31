import { ApiProperty } from '@nestjs/swagger';

export class RoomResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  roomId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  validFrom: Date;

  @ApiProperty()
  validUntil: Date;

  @ApiProperty()
  ownerId: string;
}

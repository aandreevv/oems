import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetEventRequest {
  @ApiProperty({ description: 'Id of the existing event' })
  @IsUUID()
  @IsNotEmpty()
  eventId: string;
}

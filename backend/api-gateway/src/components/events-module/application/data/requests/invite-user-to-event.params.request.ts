import { ApiProperty } from '@nestjs/swagger';
import { GetEventRequest } from './get-event.request';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class InviteUserToEventParamsRequest extends GetEventRequest {
  @ApiProperty({ description: 'Id of the existing user you wish to invite' })
  @IsUUID()
  @IsNotEmpty()
  receiverId: string;
}

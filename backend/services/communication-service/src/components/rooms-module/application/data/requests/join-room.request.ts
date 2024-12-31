import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { CallParticipantRoleEnum } from '../enums/call-participant-role.enum';

export class JoinRoomRequest {
  @IsString()
  @IsNotEmpty()
  roomId: string;

  @IsUUID()
  @IsNotEmpty()
  accountId: string;

  @IsEnum(CallParticipantRoleEnum)
  @IsNotEmpty()
  role: CallParticipantRoleEnum;
}

import { IsNotEmpty, IsUUID } from 'class-validator';
import { GetChatRequest } from './get-chat.request';

export class ChatParticipationRequest extends GetChatRequest {
  @IsUUID()
  @IsNotEmpty()
  accountId: string;

  @IsUUID()
  @IsNotEmpty()
  identityId: string;
}

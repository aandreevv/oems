import { IsNotEmpty, IsString } from 'class-validator';

export class GetChatRequest {
  @IsString()
  @IsNotEmpty()
  chatId: string;
}

import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetUserChatsRequest {
  @IsUUID()
  @IsNotEmpty()
  accountId: string;
}

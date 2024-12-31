import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetChatByIdRequest {
  @ApiProperty({ description: 'Id of the existing chat' })
  @IsUUID()
  @IsNotEmpty()
  chatId: string;
}

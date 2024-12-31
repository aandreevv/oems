import { ApiProperty } from '@nestjs/swagger';

export class ChatResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  threadId: string;

  @ApiProperty()
  topic: string;

  @ApiProperty()
  image?: string;

  @ApiProperty()
  createdAt: Date;
}

import { ApiProperty } from '@nestjs/swagger';
import { ConnectionEnum } from '../enums/connection.enum';

export class ConnectionResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  type: ConnectionEnum;

  @ApiProperty()
  url: string;
}

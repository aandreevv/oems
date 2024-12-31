import { IsEnum, IsNotEmpty, IsUrl, IsUUID } from 'class-validator';
import { ConnectionEnum } from '../enums/connection.enum';

export class CreateConnectionRequest {
  @IsUUID()
  @IsNotEmpty()
  accountId: string;

  @IsEnum(ConnectionEnum)
  @IsNotEmpty()
  type: ConnectionEnum;

  @IsUrl()
  @IsNotEmpty()
  url: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsUrl } from 'class-validator';
import { ConnectionEnum } from '../enums/connection.enum';

export class AddConnectionRequest {
  @ApiProperty({ description: 'Type of connection (name of social media)', enum: ConnectionEnum, example: ConnectionEnum.INSTAGRAM })
  @IsEnum(ConnectionEnum)
  @IsNotEmpty()
  type: ConnectionEnum;

  @ApiProperty({ description: 'URL of the connection', example: 'https://www.instagram.com/instagram/' })
  @IsUrl()
  @IsNotEmpty()
  url: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { EventAccessEnum } from '../enums/event-access.enum';
import { AccountResponse } from '../../../../users-module/application/data/responses/account.response';

export class EventResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  access: EventAccessEnum;

  @ApiProperty()
  paid: boolean;

  @ApiProperty()
  price?: number;

  @ApiProperty()
  image?: string;

  @ApiProperty()
  roomId: string;

  @ApiProperty()
  chatId: string;

  @ApiProperty()
  categories: string[];

  @ApiProperty()
  type: string[];

  @ApiProperty()
  owner: AccountResponse;
}

import { ApiProperty } from '@nestjs/swagger';
import { InterestEnum } from '../enums/interest.enum';

export class InterestResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  type: InterestEnum;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetUserInterestRequest {
  @ApiProperty({ description: 'Id of existing interest' })
  @IsUUID()
  @IsNotEmpty()
  interestId: string;
}

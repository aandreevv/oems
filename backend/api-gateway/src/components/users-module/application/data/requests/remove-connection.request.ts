import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class RemoveConnectionRequest {
  @ApiProperty({ description: 'Id of existing connection' })
  @IsUUID()
  @IsNotEmpty()
  connectionId: string;
}

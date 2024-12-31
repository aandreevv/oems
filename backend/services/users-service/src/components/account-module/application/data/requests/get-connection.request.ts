import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetConnectionRequest {
  @IsUUID()
  @IsNotEmpty()
  connectionId: string;
}

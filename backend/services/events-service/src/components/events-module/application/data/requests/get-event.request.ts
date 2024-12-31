import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { AccountInterface } from '../../../../../shared-module/application/data/interfaces/account.interface';

export class GetEventRequest {
  @IsUUID()
  @IsNotEmpty()
  eventId: string;

  @IsUUID()
  @IsOptional()
  account?: AccountInterface;
}

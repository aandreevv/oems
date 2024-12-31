import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { AccountInterface } from '../../../../../shared-module/application/data/interfaces/account.interface';

export class BuyTicketRequest {
  @IsUUID()
  @IsNotEmpty()
  eventId: string;

  @IsNotEmpty()
  account: AccountInterface;

  @IsNumber()
  paid: number;
}

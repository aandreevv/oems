import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { AccountInterface } from '../interfaces/account.interface';

export class GetAccountByIdRequest {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsOptional()
  account?: AccountInterface;
}

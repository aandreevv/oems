import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class BuyTicketRequest {
  @ApiProperty({ description: 'Amount of money paid for a ticket', example: 100 })
  @IsNumber()
  @IsNotEmpty()
  paid: number;
}

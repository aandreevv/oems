import { ArrayNotEmpty, IsArray, IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { InterestEnum } from '../enums/interest.enum';

export class CreateInterestRequest {
  @IsUUID()
  @IsNotEmpty()
  accountId: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(InterestEnum, { each: true })
  @IsNotEmpty()
  types: InterestEnum[];
}

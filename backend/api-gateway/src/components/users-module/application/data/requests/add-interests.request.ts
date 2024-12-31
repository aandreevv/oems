import { ApiProperty } from '@nestjs/swagger';
import { InterestEnum } from '../enums/interest.enum';
import { ArrayNotEmpty, IsArray, IsEnum, IsNotEmpty } from 'class-validator';

export class AddInterestsRequest {
  @ApiProperty({ description: 'Types of interests (enums)', isArray: true, example: [InterestEnum.ART_AND_DESIGN] })
  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(InterestEnum, { each: true })
  @IsNotEmpty()
  types: InterestEnum[];
}

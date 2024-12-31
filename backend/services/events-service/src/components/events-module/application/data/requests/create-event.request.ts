import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { EventAccessEnum } from '../enums/event-access.enum';

export class CreateEventRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsDate()
  @IsNotEmpty()
  date: Date;

  @IsEnum(EventAccessEnum)
  @IsNotEmpty()
  access: EventAccessEnum;

  @IsString()
  @IsNotEmpty()
  ownerId: string;

  @IsBoolean()
  @IsNotEmpty()
  paid: boolean;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  types: string[];
}

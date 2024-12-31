import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDate,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { EventAccessEnum } from '../enums/event-access.enum';
import { ApiProperty } from '@nestjs/swagger';
import { EventTypeEnum } from '../enums/event-type.enum';

export class CreateEventRequest {
  @ApiProperty({ description: 'Name of the event', example: 'New event' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Description of the event', example: null })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ description: 'Date of the event', example: new Date() })
  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @ApiProperty({ description: 'Type of the access to the event', enum: EventAccessEnum, example: EventAccessEnum.PUBLIC })
  @IsEnum(EventAccessEnum)
  @IsNotEmpty()
  access: EventAccessEnum;

  @ApiProperty({ description: 'Flag whether the event is needed to pay before visit', example: false })
  @IsBoolean()
  @IsNotEmpty()
  paid: boolean;

  @ApiProperty({ description: 'Price of the ticket', example: null })
  @IsNumber()
  @IsOptional()
  price: number;

  @ApiProperty({ description: 'Categories of the event', isArray: true, example: ['GARDENING'] })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  categories: string[];

  @ApiProperty({
    description: 'Type of event: listen and watch only or have a full functionality',
    enum: EventTypeEnum,
    example: EventTypeEnum.ATTENDEE_CALL,
  })
  @IsEnum(EventTypeEnum)
  @IsNotEmpty()
  type: EventTypeEnum;
}

import { IsDate, IsDateString, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { LanguageEnum } from '../enums/language.enum';
import { ApiProperty } from '@nestjs/swagger';

export class SetupProfileRequest {
  @ApiProperty({ description: 'Users full name', example: 'User User' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ description: 'Users special name (must be unique)', example: `user${Math.floor(Math.random() * 9000) + 1000}` })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: 'Users date of birth', example: new Date().toISOString().split('T')[0] })
  @IsDateString()
  @IsNotEmpty()
  dateOfBirth: Date;

  @ApiProperty({ description: 'Users bio (profile description)', example: null })
  @IsString()
  @IsOptional()
  bio: string;

  @ApiProperty({ description: 'Users phone number', example: `+38093${Math.floor(100000 + Math.random() * 900000)}1` })
  @IsPhoneNumber()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({ description: 'Users language', enum: LanguageEnum, example: LanguageEnum.UKRAINIAN })
  @IsEnum(LanguageEnum)
  @IsNotEmpty()
  language: LanguageEnum;
}

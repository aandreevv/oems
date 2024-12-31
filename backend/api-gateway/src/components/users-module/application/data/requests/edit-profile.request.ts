import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { LanguageEnum } from '../../../../auth-module/application/data/enums/language.enum';

export class EditProfileRequest {
  @ApiProperty({ description: 'Users full name to edit', example: 'User User' })
  @IsString()
  @IsOptional()
  fullName: string;

  @ApiProperty({ description: 'Users special name to edit(must be unique)', example: `user${Math.floor(Math.random() * 9000) + 1000}` })
  @IsString()
  @IsOptional()
  username: string;

  @ApiProperty({ description: 'Users date of birth to edit', example: new Date().toISOString().split('T')[0] })
  @IsDateString()
  @IsOptional()
  dateOfBirth: Date;

  @ApiProperty({ description: 'Users bio (profile description) to edit', example: null })
  @IsString()
  @IsOptional()
  bio: string;

  @ApiProperty({ description: 'Users phone number to edit', example: `+38093${Math.floor(100000 + Math.random() * 900000)}1` })
  @IsPhoneNumber()
  @IsOptional()
  phoneNumber: string;

  @ApiProperty({ description: 'Users language to edit', enum: LanguageEnum, example: LanguageEnum.UKRAINIAN })
  @IsEnum(LanguageEnum)
  @IsOptional()
  language: LanguageEnum;
}

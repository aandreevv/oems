import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsUUID } from 'class-validator';
import { LanguageEnum } from '../enums/language.enum';

export class CreateProfileRequest {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsDate()
  @IsNotEmpty()
  dateOfBirth: Date;

  @IsString()
  @IsOptional()
  bio: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  phoneNumber: string;

  @IsEnum(LanguageEnum)
  @IsNotEmpty()
  language: LanguageEnum;

  @IsUUID()
  @IsNotEmpty()
  accountId: string;
}

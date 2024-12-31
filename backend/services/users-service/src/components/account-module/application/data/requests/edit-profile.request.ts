import { IsDateString, IsEnum, IsOptional, IsPhoneNumber, IsString, IsUUID } from 'class-validator';
import { LanguageEnum } from '../enums/language.enum';

export class EditProfileRequest {
  @IsString()
  @IsOptional()
  fullName?: string;

  @IsString()
  @IsOptional()
  username?: string;

  @IsDateString()
  @IsOptional()
  dateOfBirth?: Date;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  picture?: string;

  @IsPhoneNumber()
  @IsOptional()
  phoneNumber?: string;

  @IsEnum(LanguageEnum)
  @IsOptional()
  language?: LanguageEnum;
}

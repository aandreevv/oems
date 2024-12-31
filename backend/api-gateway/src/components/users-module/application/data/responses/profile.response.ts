import { ApiProperty } from '@nestjs/swagger';
import { LanguageEnum } from '../../../../auth-module/application/data/enums/language.enum';

export class ProfileResponse {
  @ApiProperty()
  fullName: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  dateOfBirth: Date;

  @ApiProperty()
  bio: string;

  @ApiProperty()
  picture: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  language: LanguageEnum;
}

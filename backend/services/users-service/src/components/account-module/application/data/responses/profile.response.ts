import { LanguageEnum } from '../enums/language.enum';
import { ProfileDataInterface } from '../interfaces/profile-data.interface';

export class ProfileResponse {
  fullName: string;
  username: string;
  dateOfBirth: Date;
  bio: string;
  picture: string;
  phoneNumber: string;
  language: LanguageEnum;
  data?: ProfileDataInterface;
}

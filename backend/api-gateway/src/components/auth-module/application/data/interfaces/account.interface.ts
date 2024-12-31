import { LanguageEnum } from '../enums/language.enum';

export interface AccountInterface {
  id: string;
  email: string;
  profile: {
    id: string;
    fullName: string;
    username: string;
    dateOfBirth: Date;
    bio: string;
    picture: string;
    phoneNumber: string;
    language: LanguageEnum;
  };
}

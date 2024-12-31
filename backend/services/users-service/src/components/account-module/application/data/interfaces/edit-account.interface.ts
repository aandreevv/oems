import { LanguageEnum } from '../enums/language.enum';

export interface EditAccountInterface {
  email?: string;
  profile: {
    fullName?: string;
    username?: string;
    dateOfBirth?: Date;
    bio?: string;
    picture?: string;
    phoneNumber?: string;
    language?: LanguageEnum;
  };
}

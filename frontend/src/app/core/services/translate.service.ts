import { Injectable } from '@angular/core';
import {ENGLISH} from "../../../assets/l11n/en";
import {UKRAINIAN} from "../../../assets/l11n/ua";
import {Language} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private translations: any = {
    en: {
      ...ENGLISH,
    },
    ua: {
      ...UKRAINIAN,
    }
  };

  translate(key: string, lang: string): string {
    return this.translations[lang][key] || key;
  }

  getCurrentLanguage(): string {
    const lang = localStorage.getItem('language')
    return lang === Language.ENGLISH ? 'en' : 'ua';
  }
}


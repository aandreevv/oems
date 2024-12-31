import { Pipe, PipeTransform } from '@angular/core';
import {TranslationService} from "../../core/services/translate.service";

@Pipe({
  standalone: true,
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  constructor(private translationService: TranslationService) {}

  transform(key: string): string {
    const currentLang = this.translationService.getCurrentLanguage();
    return this.translationService.translate(key, currentLang);
  }
}

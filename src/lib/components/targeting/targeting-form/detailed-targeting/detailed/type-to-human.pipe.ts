import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';

@Pipe({
  name: 'fbaTypeToHuman'
})
export class TypeToHumanPipe implements PipeTransform {

  constructor (private translateService: TranslateService) {}

  transform (value: any): any {
    if (value && typeof value === 'string') {
      return this.translateService.instant(`fba-detailed-dropdown-suggested.${value.toUpperCase()}`) || value;
    } else {
      return value;
    }
  }

}

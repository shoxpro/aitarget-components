import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';

@Pipe({
  name: 'fullType'
})
export class FullTypePipe implements PipeTransform {

  constructor (private translateService: TranslateService) {}

  transform (value: any, args?: any): any {
    let translatedType = this.translateService.instant(`geo-targeting-dropdown.${value.type}`);
    let combinedType   = [translatedType, value.category];
    return combinedType.filter((name) => Boolean(name))
                       .join(' / ');
  }

}

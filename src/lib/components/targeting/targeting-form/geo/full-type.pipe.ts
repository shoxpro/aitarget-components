import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';

@Pipe({
  name: 'fbaFullType'
})
export class FullTypePipe implements PipeTransform {

  constructor (private translateService: TranslateService) {}

  transform (value: any): any {
    let translatedType = this.translateService.instant(`fba-geo-dropdown.${value.type}`);
    let combinedType   = [translatedType, value.category];
    return combinedType.filter((name) => Boolean(name))
                       .join(' / ');
  }

}

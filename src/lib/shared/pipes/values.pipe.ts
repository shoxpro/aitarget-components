import { PipeTransform, Pipe } from '@angular/core';

@Pipe({name: 'fbaValues', pure: false})
export class ValuesPipe implements PipeTransform {
  transform (value: any): any {
    return Object.keys(value)
                 .map(key => value[key]);
  }
}

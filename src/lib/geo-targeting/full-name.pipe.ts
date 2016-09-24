import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform (value: any, args?: any): any {
    let allNames = [value.name, value.region, (value.type !== 'country' && value.country_name)];
    return allNames.filter((name) => Boolean(name))
                   .join(', ');
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fbaFullName'
})
export class FullNamePipe implements PipeTransform {

  transform (value: any): any {
    let allNames = [value.name, value.region, (value.type !== 'country' && value.country_name)];
    return allNames.filter((name) => Boolean(name))
                   .join(', ');
  }

}

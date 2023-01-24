import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(values: any[], search : string, properties: string[]): any {
    return !search?.length ? values : values.filter(x => properties.some(prop => x[prop] && x[prop].toLowerCase().includes(search.toLowerCase()) ));
  }

}

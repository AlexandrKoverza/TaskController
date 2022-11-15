import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortPipe'
})
export class SortPipePipe implements PipeTransform {

  transform(boards: any[], filter: boolean) {
    if(!filter) return boards.sort((a: any, b: any) => a.name > b.name ? -1 : 1);
    return boards.sort((a: any, b: any) => a.name > b.name ? 1 : -1);

  }

}

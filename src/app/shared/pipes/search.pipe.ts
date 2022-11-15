import { Pipe, PipeTransform } from '@angular/core';
import { Board } from '../../models';

@Pipe({
  name: 'searchPipe',
})
export class SearchPipe implements PipeTransform {
  transform(boards: Board[], search: string) {
    if (search.length === 0) return boards;
    return boards.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }
}
import { Board } from 'src/app/mock-data/boards';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPipe',
})
export class SearchPipePipe implements PipeTransform {
  transform(boards: Board[], search: string) {
    if (search.length === 0) return boards;
    return boards.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }
}

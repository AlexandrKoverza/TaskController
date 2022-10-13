import { Pipe, PipeTransform } from '@angular/core';
import { Boards } from '../services/boards.service';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {

  transform(boards: Boards[], search: string) {
    return boards.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
  }

}

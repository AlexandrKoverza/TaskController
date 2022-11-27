import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskPipe'
})
export class TaskPipePipe implements PipeTransform {

  transform(boards: any[], filter: boolean) {
    if(!filter) return boards.sort((a: any, b: any) => a.column > b.column ? -1 : 1);
    return boards.sort((a: any, b: any) => a.column > b.column ? 1 : -1);
  }

}

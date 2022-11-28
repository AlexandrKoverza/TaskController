import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { boardColumns } from '../constants/board-columns';
import { boardsMock } from 'src/mocks/boards-mock';

@Injectable({
  providedIn: 'root',
})
export class BoardsServiceMock {

  getBoard(id: string) {
    return of(boardsMock[0])
  }

  getBoards(): Observable<any[]> {
    return of(boardsMock);
  }

  createBoard(board: any): Observable<any> {
    const newBoard = {
      ...board,
      boardColumns,
      creationDate: Date.now(),
    }

    return of([...boardsMock, newBoard])
  }

  deleteBoard(id: any) {
    return of(boardsMock[0])
  }

  updateBoard(board: Partial<any>): Observable<any> {
    return of(true);
  }
}

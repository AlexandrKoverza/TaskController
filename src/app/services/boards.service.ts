import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Board, BoardBase } from '../models';
import { boardColumns } from '../constants/board-columns';

const options = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  url: string = 'http://localhost:3000/boards';
  boards: Board[] = [];

  constructor(private http: HttpClient) {
  }

  getBoard(id: string): Observable<Board> {
    return this.http.get<Board>(`${ this.url }/${ id }`)
  }

  getBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(this.url)
  }

  createBoard(board: BoardBase): Observable<Board> {
    const newBoard = {
      ...board,
      boardColumns,
      creationDate: Date.now(),
    }

    return this.http.post<Board>(this.url, newBoard);
  }

  deleteBoard(id: any) {
    return this.http.delete<Board[]>(`${ this.url }/${ id }`, id);
  }

  updateBoard(board: Partial<Board>): Observable<Board[]> {
    return this.http.patch<Board[]>(`${ this.url }/${ board.id }`, board, options);
  }
}

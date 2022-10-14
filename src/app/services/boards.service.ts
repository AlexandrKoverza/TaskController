import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Board } from '../mock-data/boards';
import { BehaviorSubject, Observable, tap } from 'rxjs';

const options = {
  headers: new HttpHeaders({"Content-Type": "application/json"})
}

@Injectable({
  providedIn: 'root'
})
export class BoardsService { 
  url: string = "http://localhost:3000/Boards"
  boards: Board[] = []

  constructor(private http: HttpClient) {}
  
  getBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(this.url).pipe(
      tap(boards => this.boards = boards )
    )
  }

  getBoardById(id: string) {
    return this.boards.find((x) => x.id == id);
  }

  createBoard(board: Board): Observable<Board[]> {
    return this.http.post<Board[]>(this.url, board)
    .pipe(
      tap(() => {
        this.boards.push(board);
      })
    )
  }

  deleteItem(id: any) {
    const link = `${this.url}/${id}`
    return this.http.delete<Board[]>(link, id)
  }

  updateItem(board: Board): Observable<Board[]> {
    return this.http.patch<Board[]>(`${this.url}/${board.id}`, board, options)
  }

}

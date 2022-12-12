import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { Board, BoardBase } from "../models";

const options = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class BoardsService {
  url: string = "http://localhost:3000/boards";

  boards$ = new BehaviorSubject<BoardBase[]>([]);

  board$ = new BehaviorSubject<Board | null>(null);

  constructor(private http: HttpClient) {}

  getBoard$(): Observable<Board | null> {
    return this.board$.asObservable();
  }

  getBoards$(): Observable<BoardBase[]> {
    return this.boards$.asObservable();
  }

  getBoard(id: string): Observable<Board> {
    return this.http.get<Board>(`${this.url}/${id}?_embed=tasks&_embed=comments`);
  }

  getBoards(): Observable<BoardBase[]> {
    return this.http.get<BoardBase[]>(this.url);
  }

  updateBoardInfo(boardId: string): void {
    this.getBoard(boardId).subscribe(board => {
      this.board$.next(board);
    });
  };

  updateBoards(): void {
    this.getBoards().subscribe(boards => {
      this.boards$.next(boards);
    })
  }

  createBoard(board: any): Observable<any> {
    const newBoard = {
      ...board
    };

    return this.http.post<Board>(this.url, newBoard);
  }

  updateBoard(board: Partial<any>): Observable<any[]> {
    return this.http.patch<any[]>(`${this.url}/${board.id}`, board, options);
  }

  deleteBoard(id: any) {
    return this.http.delete<any[]>(`${this.url}/${id}`, id);
  }

  //tasks
  createTask(task: any): Observable<any> {
    const newTask = {
      ...task
    };

    return this.http.post<any>(`http://localhost:3000/tasks/`, newTask);
  }

  updateTask(task: any): Observable<any[]> {
    return this.http.patch<any[]>(`http://localhost:3000/tasks/${task.id}`, task, options);
  }

  deleteTask(taskId: any) {
    return this.http.delete<any[]>(`http://localhost:3000/tasks/${taskId}`, taskId);
  }

  //comments
  createComment(comment: any) {
    const newComment = {
      ...comment
    };

    return this.http.post<any>(`http://localhost:3000/comments/`, newComment);
  }

  deleteComment(commentId: any) {
    return this.http.delete<any[]>(`http://localhost:3000/comments/${commentId}`, commentId);
  }

}

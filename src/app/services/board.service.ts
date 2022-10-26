import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Board } from '../mock-data/boards';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private initBoard = [
    {
      id: 1,
      title: 'To Do',
      color: '#CECF9C',
      list: [
        {
          id: 1,
          text: 'example card 1',
          creationData: 1666371895211,
          comments: [
            {
              id: 1,
              text: 'some comment'
            }
          ]
        }
      ]
    },
    {
      id: 2,
      title: 'In progress',
      color: '#FFCF9C',
      list: [
        {
          id: 2,
          text: 'example card 2',
          creationData: 1666371895211,
          comments: [
            {
              id: 1,
              text: 'some comment'
            }
          ]
        }
      ]
    },
    {
      id: 2,
      title: 'Done',
      color: '#31CF63',
      list: [
        {
          id: 3,
          text: 'example card 3',
          creationData: 1666371895211,
          comments: [
            {
              id: 1,
              text: 'some comment'
            },
            {
              id: 2,
              text: 'some comment'
            },
            {
              id: 3,
              text: 'some comment'
            }
          ]
        }
      ]
    }
  ]

  board: any[] = this.initBoard;
  board$ = new BehaviorSubject<any[]>(this.initBoard)

  constructor(private http: HttpClient) {    
  }

  getBoard$() {
    return this.board$.asObservable()
  }

  deleteItem(itemId: number, columnId: number) {
    this.board = this.board.map((column) => {
      if(column.id === columnId) {
        column.list = column.list.filter((item: any) => item.id !== itemId)
      }
      return column
    })
    this.board$.next([...this.board])
  }

  addComment(columnId: any, itemId: any, text: string) {
    this.board = this.board.map((column) => {
      if(column.id === columnId) {
        const list = column.list.map((item: { id: any; comments: any[]; }) => {
          if(item.id === itemId) {
            const comment = {
              id: Date.now(),
              text
            }
            item.comments = [comment, ...item.comments]
          }
          return item
        })
        column.list = list
      }
      return column
    })
    this.board$.next([...this.board])
  }

  deleteComment(columnId: any, itemId: any, commentId: any) {
    this.board = this.board.map((column) => {
      if(column.id === columnId) {
        const list = column.list.map((item: { id: any; comments: any[]; }) => {
          if(item.id === itemId) {
            item.comments = item.comments.filter((comment: { id: any; }) => {
              return comment.id !== commentId
            })
          }
          return item
        })
        column.list = list
      }
      return column
    })
    this.board$.next([...this.board])
  }
}

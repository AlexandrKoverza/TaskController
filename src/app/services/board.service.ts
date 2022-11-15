import { BehaviorSubject } from 'rxjs';
import { Injectable, Input } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private initBoard = [
    {
      id: 1,
      title: 'To Do',
      color: '#79A7D3',
      list: [
        {
          id: 1,
          text: 'example card 1',
          creationData: Date.now(),
          board_id: 1,
          comments: [
            {
              id: 1,
              text: 'some comment',
            },
          ],
        },
        {
          id: 2,
          text: 'example card 2',
          creationData: 2,
          board_id: 1,
          comments: [
            {
              id: 1,
              text: 'some comment',
            },
          ],
        },
        {
          id: 3,
          text: 'example card 3',
          creationData: 3,
          board_id: 1,
          comments: [
            {
              id: 1,
              text: 'some comment',
            },
          ],
        },
      ],
    },
    {
      id: 2,
      title: 'In progress',
      color: '#FDDD85',
      list: [
        {
          id: 1,
          text: 'example card 1',
          creationData: 1,
          board_id: 2,
          comments: [
            {
              id: 1,
              text: 'some comment',
            },
          ],
        },
        {
          id: 2,
          text: 'example card 2',
          creationData: 2,
          board_id: 2,
          comments: [
            {
              id: 1,
              text: 'some comment',
            },
            {
              id: 2,
              text: 'some comment',
            },
          ],
        },
        {
          id: 3,
          text: 'example card 3',
          creationData: 3,
          board_id: 2,
          comments: [
            {
              id: 1,
              text: 'some comment',
            },
          ],
        },
      ],
    },
    {
      id: 3,
      title: 'Done',
      color: '#FF8C5D',
      list: [
        {
          id: 1,
          text: 'example card 1',
          creationData: 1,
          board_id: 3,
          comments: [
            {
              id: 1,
              text: 'some comment',
            },
          ],
        },
        {
          id: 2,
          text: 'example card 2',
          creationData: 2,
          board_id: 3,
          comments: [
            {
              id: 1,
              text: 'some comment',
            },
          ],
        },
        {
          id: 3,
          text: 'example card 3',
          creationData: 3,
          board_id: 3,
          comments: [
            {
              id: 1,
              text: 'some comment',
            },
          ],
        },
      ],
    },
  ];

  board: any[] = this.initBoard;
  board$ = new BehaviorSubject<any[]>(this.initBoard);

  constructor() {}

  getBoard$() {
    return this.board$.asObservable();
  }

  createCard(newCard: any, columnId: number) {
    this.board = this.board.map((column) => {
      if (column.id === columnId) {
        column.list = [...column.list, newCard];
      }
      return column;
    });
    this.board$.next([...this.board]);
  }

  deleteItem(itemId: number, columnId: number) {
    this.board = this.board.map((column) => {
      if (column.id === columnId) {
        column.list = column.list.filter((item: any) => item.id !== itemId);
      }
      return column;
    });
    this.board$.next([...this.board]);
  }

  addComment(columnId: any, itemId: any, text: string) {
    this.board = this.board.map((column) => {
      if (column.id === columnId) {
        const list = column.list.map((item: { id: any; comments: any[] }) => {
          if (item.id === itemId) {
            const comment = {
              id: Date.now(),
              text,
            };
            item.comments = [comment, ...item.comments];
          }
          return item;
        });
        column.list = list;
      }
      return column;
    });
    this.board$.next([...this.board]);
  }

  deleteComment(columnId: any, itemId: any, commentId: any) {
    this.board = this.board.map((column) => {
      if (column.id === columnId) {
        const list = column.list.map((item: { id: any; comments: any[] }) => {
          if (item.id === itemId) {
            item.comments = item.comments.filter((comment: { id: any }) => {
              return comment.id !== commentId;
            });
          }
          return item;
        });
        column.list = list;
      }
      return column;
    });
    this.board$.next([...this.board]);
  }

  updateCard(item: any) {
    this.board = this.board.map((column) => {
      if (column.id === item.board_id) {
        column.list.map((i: { text: any }) => {
          i.text = item.text;
        });
      }
      return column;
    });
    this.board$.next([...this.board]);
  }
}

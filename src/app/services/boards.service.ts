import { Injectable } from '@angular/core';
import { boards } from '../mock-data/boards';

export interface Boards {
  id: string | number;
  name: string;
  description: string;
  tasks: number;
  creationDate: number;
}

@Injectable({
  providedIn: 'root'
})
export class BoardsService {
  boards: Boards[] = boards;

  constructor() {}

  public getBoardById(id: string) {
    return this.boards.find((x) => x.id == id);
  }

  public editBoard(id: string, value: any) {
    let actualCourse: any  = this.getBoardById(id);
    let index = this.boards.indexOf(actualCourse);
    this.boards[index] = value;
  }
}

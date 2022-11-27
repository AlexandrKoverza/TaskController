import { BoardColumn } from './board-column';

export interface BoardBase {
  name: string;
  description: string;
}

export interface Board extends BoardBase {
type: any;
  id: string;
  column: BoardColumn[];
  creationDate: number;
}

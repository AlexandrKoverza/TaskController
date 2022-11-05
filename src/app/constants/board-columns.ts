import { BoardColumn } from '../models/board-column';

export const boardColumns: BoardColumn[] = [
  {
    id: 1,
    type: 'toDo',
    list: [],
  },
  {
    id: 2,
    type: 'inProgress',
    list: [],
  },
  {
    id: 3,
    type: 'done',
    list: [],
  },
];

export const COLUMN_MAPPER = {
  toDo: {
    title: 'To Do',
    colour: '#CECF9C',
  },
  inProgress: {
    title: 'In Progress',
    colour: '#FFCF9C',
  },
  done: {
    title: 'Done',
    colour: '#31CF63',
  }
}

export type ColumnType = 'toDo' | 'inProgress' | 'done';

export interface BoardColumn {
  id: number;
  type: ColumnType;
  list: any[];
}

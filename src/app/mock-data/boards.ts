export class Board {
  id: string | number;
  name: string;
  description: string;
  board: any;
  creationDate: number;

  constructor(
    id: string | number,
    name: string,
    description: string,
    board: any,
    creationDate: number
  ) {
    (this.id = id),
    (this.name = name),
    (this.description = description),
    (this.board = board),
    (this.creationDate = creationDate);
  }
}

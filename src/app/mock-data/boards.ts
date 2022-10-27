export class Board {
  id: string | number;
  name: string;
  description: string;
  column: any[];
  creationDate: number;

  constructor(
    id: string | number,
    name: string,
    description: string,
    column: any[],
    creationDate: number
  ) {
    (this.id = id),
    (this.name = name),
    (this.description = description),
    (this.column = column),
    (this.creationDate = creationDate);
  }
}

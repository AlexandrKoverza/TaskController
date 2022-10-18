export class Board {
  id: string | number;
  name: string;
  description: string;
  tasks:  number;
  creationDate: number;

  constructor(
    id: string | number,
    name: string,
    description: string,
    tasks: number,
    creationDate: number
  ) {
    (this.id = id),
      (this.name = name),
      (this.description = description),
      (this.tasks = tasks),
      (this.creationDate = creationDate);
  }
}

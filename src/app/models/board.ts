import { ITask } from "./task";
import { IComment } from "./comment";

export interface BoardBase {
  id: string;
  name: string;
  description: string;
  creationDate: number;
}

export interface Board extends BoardBase {
  tasks?: ITask[];
  comments?: IComment[]
}

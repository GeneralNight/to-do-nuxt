import { ToDoDoc } from "@libs/models";


export interface IToDoRepository {
  listToDo(): Promise<ToDoDoc[]>;
  getToDo(toDoId: string): Promise<ToDoDoc>;
  createToDo(data: Partial<ToDoDoc>): Promise<void>;
  deleteToDo(toDoId: string): Promise<void>;
}

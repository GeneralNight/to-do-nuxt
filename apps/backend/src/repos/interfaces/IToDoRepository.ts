import { ToDoDoc, ToDoItem } from "@libs/models";


export interface IToDoRepository {
  listToDo(): Promise<ToDoDoc[]>;
  getToDo(toDoId: string): Promise<ToDoDoc>;
  createToDo(data: Partial<ToDoDoc>): Promise<void>;
  deleteToDo(toDoId: string): Promise<void>;
  getToDoItems(toDoId: string): Promise<ToDoItem[]>;
  createToDoItem(toDoId: string, data: Partial<ToDoItem>): Promise<void>;
  updateToDoItem(toDoId: string, itemId: string, data: Partial<ToDoItem>): Promise<void>;
  deleteToDoItem(toDoId: string, itemId: string): Promise<void>;
}

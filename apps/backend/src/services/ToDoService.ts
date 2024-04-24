import { ToDoDoc } from '@libs/models';
import { ToDoRepositoryFirebase } from '../repos/implementations/ToDoRepositoryFirebase';
import { IToDoRepository } from '../repos/interfaces/IToDoRepository';
import { defaultErrorHandler } from '../utils/DefaultErrorHandler';



export class ToDoService {
  private _toDoRepo: IToDoRepository;

  constructor(toDoRepo?: IToDoRepository) {
    this._toDoRepo = toDoRepo ?? new ToDoRepositoryFirebase();
  }

  private _handleError(error: any): any {
    defaultErrorHandler(error);
  }

  async listToDo(): Promise<Omit<ToDoDoc, 'items'>[]> {
    return []
  }

  async createToDo(data: Partial<ToDoDoc>): Promise<ToDoDoc> {
    return
  }

  async deleteToDO(toDoId: string): Promise<void> {
    return
  }

  async getToDo(toDoId: string): Promise<ToDoDoc> {
    return
  }

}

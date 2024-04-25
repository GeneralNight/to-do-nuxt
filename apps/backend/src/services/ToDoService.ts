import { ApiError, ResponseCode, ToDoDoc } from '@libs/models';
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
    return await this._toDoRepo.listToDo()
  }

  async createToDo(data: Partial<ToDoDoc>): Promise<void> {
    if (!data.ownerId?.length) {
      throw new ApiError(
        ResponseCode.NOT_FOUND,
        `Owner ID is required`
      );
    }
    return await this._toDoRepo.createToDo(data)
  }

  async deleteToDo(toDoId: string): Promise<void> {
    return await this._toDoRepo.deleteToDo(toDoId)
  }

  async getToDo(toDoId: string): Promise<ToDoDoc> {
    return await this._toDoRepo.getToDo(toDoId)
  }

}

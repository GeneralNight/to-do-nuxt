import { ApiError, ResponseCode, ToDoDoc, ToDoItem } from '@libs/models';
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

  async getToDoItems(toDoId: string): Promise<ToDoItem[]> {
    return await this._toDoRepo.getToDoItems(toDoId)
  }

  async createToDoItem(toDoId: string, data: Partial<ToDoItem>): Promise<void> {
    if (!data.body?.length) {
      throw new ApiError(
        ResponseCode.NOT_FOUND,
        `Body is required`
      );
    }

    data = {
      ...data,
      checked: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    return await this._toDoRepo.createToDoItem(toDoId, data)
  }

  async updateToDoItem(toDoId: string, itemId: string, data: Partial<ToDoItem>): Promise<void> {
    if (!data.body?.length) {
      throw new ApiError(
        ResponseCode.NOT_FOUND,
        `Body is required`
      );
    }

    data = {
      ...data,
      updatedAt: new Date()
    }
    return await this._toDoRepo.updateToDoItem(toDoId, itemId, data)
  }

  async deleteToDoItem(toDoId: string, itemId: string): Promise<void> {
    return await this._toDoRepo.deleteToDoItem(toDoId, itemId)
  }

}

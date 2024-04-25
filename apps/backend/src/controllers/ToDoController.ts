import { ToDoDoc, ToDoItem } from '@libs/models';
import { Body, Delete, Get, Path, Post, Put, Route, Tags } from 'tsoa';
import { ToDoService } from '../services/ToDoService';
import { defaultErrorHandler } from '../utils/DefaultErrorHandler';

@Route('toDo')
@Tags('toDo')
export class ToDoController {
  private _toDoService: ToDoService = new ToDoService();

  private _handleError(error: any): any {
    defaultErrorHandler(error);
  }

  @Get('')
  public async listToDoDocs() {
    return await this._toDoService.listToDo();
  }

  @Get('{toDoId}')
  public async getToDo(@Path() toDoId: string) {
    return await this._toDoService.getToDo(toDoId);
  }

  @Post('')
  public async createToDo(@Body() data: Partial<ToDoDoc>) {
    return await this._toDoService.createToDo(data);
  }

  @Delete('{toDoId}')
  public async deleteToDo(@Path() toDoId: string) {
    return await this._toDoService.deleteToDo(toDoId);
  }

  @Get('{toDoId}/items')
  public async getToDoItems(@Path() toDoId: string) {
    return await this._toDoService.getToDoItems(toDoId);
  }

  @Post('{toDoId}')
  public async createToDoItem(@Path() toDoId: string, @Body() data: Partial<ToDoItem>) {
    return await this._toDoService.createToDoItem(toDoId, data);
  }

  @Delete('{toDoId}/{itemId}')
  public async deleteToDoItem(@Path() toDoId: string, @Path() itemId: string) {
    return await this._toDoService.deleteToDoItem(toDoId, itemId);
  }

  @Put('{toDoId}/{itemId}')
  public async updateToDoItem(@Path() toDoId: string, @Path() itemId: string, @Body() data: Partial<ToDoItem>) {
    return await this._toDoService.updateToDoItem(toDoId, itemId, data);
  }
}

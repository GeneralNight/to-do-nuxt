import { ToDoDoc } from '@libs/models';
import { Body, Delete, Get, Path, Post, Route, Tags } from 'tsoa';
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
    return await this._toDoService.getToDo(toDoId);
  }
}

import { ToDoDoc, ToDoItem, UserProfile } from '@libs/models';
import { FetchOptions } from 'ohmyfetch';

export default {
  async backendFetch<T>(path: string, options?: FetchOptions) {
    const token = (await useFirebase.user().value?.getIdToken()) || '';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const finalOptions: any = {
      headers: { Authorization: `Bearer ${token}` },
      ...options,
    };
    return $fetch<T>(`${'http://localhost:3000/'}${path}`, finalOptions);
  },
  signup(options?: FetchOptions): Promise<void> {
    return this.backendFetch(`auth/register/email`, { method: 'POST', ...options });
  },
  getUserProfile(profileId: string, options?: FetchOptions): Promise<UserProfile> {
    return this.backendFetch(`profile/${profileId}`, { method: 'GET', ...options });
  },
  listToDo(options?: FetchOptions): Promise<ToDoDoc[]> {
    return this.backendFetch(`toDo/`, { method: 'GET', ...options });
  },
  createToDo(data: Partial<ToDoDoc>, options?: FetchOptions): Promise<void> {
    return this.backendFetch(`toDo/`, { method: 'POST', body: data, ...options });
  },
  getToDo(toDoId: string, options?: FetchOptions): Promise<ToDoDoc> {
    return this.backendFetch(`toDo/${toDoId}`, { method: 'GET', ...options });
  },
  deleteToDo(toDoId: string, options?: FetchOptions): Promise<void> {
    return this.backendFetch(`toDo/${toDoId}`, { method: 'DELETE', ...options });
  },
  createToDoItem(toDoId: string, data: Partial<ToDoItem>, options?: FetchOptions): Promise<void> {
    return this.backendFetch(`toDo/${toDoId}`, { method: 'POST', body: data, ...options });
  },
  updateToDoItem(toDoId: string, itemId: string, data: Partial<ToDoItem>, options?: FetchOptions): Promise<void> {
    return this.backendFetch(`toDo/${toDoId}/${itemId}`, { method: 'PUT', body: data, ...options });
  },
  getToDoItems(toDoId: string, options?: FetchOptions): Promise<ToDoItem[]> {
    return this.backendFetch(`toDo/${toDoId}/items`, { method: 'GET', ...options });
  },
  deleteToDoItem(toDoId: string, itemId: string, options?: FetchOptions): Promise<void> {
    return this.backendFetch(`toDo/${toDoId}/${itemId}`, { method: 'DELETE', ...options });
  },
}
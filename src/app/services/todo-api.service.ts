import { Injectable, inject } from '@angular/core';
import { delay, of } from 'rxjs';
import { Todo } from 'app/interfaces/todo';
import { HttpService } from './http.service';
import { MockBackendService } from './mock-backend.service';

@Injectable({
  providedIn: 'root'
})
export class TodoApiService extends HttpService {
  private mockBackendService = inject(MockBackendService);

  constructor() {
    super();
  }

  public resetTodos() {
    this.mockBackendService.setData();
    const todos = localStorage.getItem(this.LOCAL_STORAGE_KEY);

    return todos ? of(JSON.parse(todos)).pipe(delay(1000)) : of([]);
  }

  public loadTodos() {
    const todos = localStorage.getItem(this.LOCAL_STORAGE_KEY);

    return todos ? of(JSON.parse(todos)).pipe(delay(1000)) : of([]);
  }

  public saveTodos(todos: Todo[]) {
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }

  public checkTodo(id: Todo['id']) {
    let todos: Todo[] = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY) ?? '').map((todo: Todo) => {
      if (todo.id === id) {
        todo.isDone = !todo.isDone
      }

      return todo
    })

    return of(todos);
  }

  public deleteTodo(id: Todo['id']) {
    let todos: Todo[] = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY) ?? '').filter((todo: Todo) => todo.id !== id)

    return of(todos);
  }
}

// This file is to simulate HTTP calls. Angular by default returns observables for api calls.
// This is why we don't "directly" interact with state in todo.service.ts

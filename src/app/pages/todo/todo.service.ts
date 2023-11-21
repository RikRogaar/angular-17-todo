import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { Subject, merge, switchMap } from 'rxjs';
import { connect } from 'ngxtension/connect';
import { Todo } from 'app/interfaces/todo';
import { TodoApiService } from 'app/services/todo-api.service';

export interface TodoState {
  todos: Todo[];
  status: "loading" | "success" | "error" | "error-deleting";
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todoApiService = inject(TodoApiService);

  private state = signal<TodoState>({
    todos: [],
    status: "loading"
  });

  public todos = computed(() => this.state().todos);
  public status = computed(() => this.state().status);


  public resetTodos$ = new Subject<void>();
  public checkTodo$ = new Subject<number>();
  public deleteTodo$ = new Subject<number>();

  private checkTodoStream$ = this.checkTodo$.pipe(
    switchMap((id) => {
      return this.todoApiService.checkTodo(id);
    })
  );

  private deleteTodoStream$ = this.deleteTodo$.pipe(
    switchMap((id) => {
      return this.todoApiService.deleteTodo(id);
    })
  );

  private allTodos$ = merge(
    this.todoApiService.loadTodos(),
    this.resetTodos$.pipe(
      switchMap(() => this.todoApiService.resetTodos())
    )
  );

  constructor() {
    connect(this.state)
      .with(this.allTodos$, (state, todos) => ({
        ...state,
        todos,
        status: "success"
      }))
      .with(this.checkTodoStream$, (state, todos) => ({
        ...state,
        todos
      }))
      .with(this.deleteTodoStream$, (state, todos) => ({
        ...state,
        todos
      }))
      .with(this.resetTodos$, (state) => ({
        ...state,
        status: "loading"
      }));

    effect(() => {
      this.todoApiService.saveTodos(this.todos());
    })
  }
}

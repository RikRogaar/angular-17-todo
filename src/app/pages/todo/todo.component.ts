import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from './todo.service';
import { TodoListComponent } from './components/todo-list/todo-list.component';

@Component({
    selector: 'app-todo',
    standalone: true,
    providers: [
        TodoService,
    ],
    templateUrl: './todo.component.html',
    styleUrl: './todo.component.scss',
    imports: [
        CommonModule,
        TodoListComponent
    ]
})
export class TodoComponent {
  public todoService = inject(TodoService);
}

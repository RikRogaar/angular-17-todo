import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from 'app/interfaces/todo';
import { TodoEntryComponent } from '../todo-entry/todo-entry.component';
import { TodoService } from '../../todo.service';

@Component({
  selector: 'todo-list',
  standalone: true,
  imports: [
    CommonModule,
    TodoEntryComponent
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
  @Input() todos!: Todo[];

  public todoService = inject(TodoService);
}

import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from 'app/interfaces/todo';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { TodoService } from '../../todo.service';

@Component({
  selector: 'todo-entry',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule
  ],
  templateUrl: './todo-entry.component.html',
  styleUrl: './todo-entry.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TodoEntryComponent {
  @Input() todo!: Todo;

  public todoService = inject(TodoService);
  public faDeleteLeft = faDeleteLeft;
}

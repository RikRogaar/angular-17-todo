import { Injectable } from '@angular/core';
import { Todo } from 'app/interfaces/todo';
import { HttpService } from 'app/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class MockBackendService extends HttpService {
  private todoSeeder: Todo[] = [
    {
      id: 1,
      title: 'Learn Angular Basics',
      isDone: true,
    },
    {
      id: 2,
      title: 'Create a Component for Todo List',
      isDone: true,
    },
    {
      id: 3,
      title: 'Implement Two-Way Data Binding',
      isDone: false,
    },
    {
      id: 4,
      title: 'Add Routing to Your Angular App',
      isDone: false,
    },
    {
      id: 5,
      title: 'Deploy Angular App to Firebase',
      isDone: false,
    },
  ];

  constructor() {
    super();
  }

  public initData() {
    const data = localStorage.getItem(this.LOCAL_STORAGE_KEY);

    if (!data) {
      this.setData();
    }
  }

  public setData() {
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(this.todoSeeder));
  }
}

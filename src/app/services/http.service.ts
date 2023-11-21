import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  protected LOCAL_STORAGE_KEY: string = 'a17-todos';
}

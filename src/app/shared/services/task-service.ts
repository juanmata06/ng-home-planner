import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, Observable } from 'rxjs';

// TODO: use import { environment } from '@environments/environment';
import { Task, FakeApiTask } from '../interfaces/index';
import { mapFakeApiTaskToTask } from '../mappers/index';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com';
  private _httpClient = inject(HttpClient);
  private readonly tasksUrl = `${this.apiUrl}/todos`;

  public getAllTasks(): Observable<Task[]> {
    return this._httpClient
      .get<FakeApiTask[]>(this.tasksUrl)
      .pipe(
        map((fakeTasks: FakeApiTask[]) =>
          fakeTasks
            .filter((fakeTask) => fakeTask.id < 10)
            .map((fakeTask) => mapFakeApiTaskToTask(fakeTask)),
        ),
      );
  }

  public deleteTask(id: number): Observable<void> {
    return this._httpClient.delete<void>(`${this.tasksUrl}/${id}`);
  }
}

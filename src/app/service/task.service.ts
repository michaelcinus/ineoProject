import { Injectable } from '@angular/core';
import { Task } from 'src/app/models/task';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:3000/Tasks';


  constructor(private http: HttpClient) { }

  //Funzione che restituisce tutte le tasks
  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  //Funzione Aggiungi Task
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  // Funzione Modifica task
  editTask(updatedTask: Task): Observable<Task> {
    return this.http.put<Task>(this.apiUrl + `/${updatedTask.id}`, updatedTask)
  }

  // Funzione Elimina task
  deleteTask(id: number): Observable<Task> {
    return this.http.delete<Task>(this.apiUrl + `/${id}`)
  }
}

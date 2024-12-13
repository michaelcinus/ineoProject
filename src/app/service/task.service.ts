import { Injectable } from '@angular/core';
import { Task } from 'src/app/models/task';
import { Tasks } from 'src/app/mocks/tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasks: Task[] = Tasks;

  constructor() { }

  //Funzione che restituisce tutte le tasks
  getAllTasks(): Task[] {
    return this.tasks;
  }

  //Funzione Aggiungi Task
  addTask(task: Task): void {
    task.id = this.tasks.length + 1;  // Assegna un id unico
    this.tasks.push(task);  // Aggiungi il task all'array
  }

  // Funzione Modifica task
  editTask(updatedTask: Task): void {
    // Trova l'indice del task da modificare
    const index = this.tasks.findIndex(task => task.id === updatedTask.id);

    if (index !== -1) {
      this.tasks[index] = updatedTask; // Aggiorna il task
    }
  }

  // Funzione Elimina task
  deleteTask(id?: number): void {
    // Trova l'indice del task da eliminare
    const index = this.tasks.findIndex(task => task.id === id);

    if (index !== -1) {
      this.tasks.splice(index, 1);  // Rimuove il task dall'array
    }
  }
}

import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { Tasks } from 'src/app/mocks/tasks'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})

export class TaskComponent {
  displayedColumns: string[] = ['title', 'description', 'state', 'actions'];
  dataSource : MatTableDataSource<Task>;

  tasks: Task[] = [];
  taskSelected: Task;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private modal: MatDialog,) {
    this.tasks = Tasks;
    this.taskSelected = this.tasks[0];
    this.dataSource = new MatTableDataSource(this.tasks);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Funzione apri modale Edit
  openEditModal(modale : any, task: Task) {
    this.taskSelected = {...task};
    this.modal.open(modale, {
      width: '500px'
    });
  }

  // Funzione apri modale Delete
  openDeleteModal(modale : any, task: Task) {
    this.taskSelected = {...task};
    this.modal.open(modale, {
      width: '500px'
    });
  }

  // Funzione chiudi modale
  closeModal(){
    this.modal.closeAll();
  }

  //Funzione Add Task

  //Funzione Edit Task
  editTask(task: Task) {
  // Trova l'indice del task da modificare
  const index = this.tasks.findIndex(t => t.id === task.id);

  if (index !== -1) {
    // Aggiorna il task nell'array e la lista
    this.tasks[index] = task;
    this.dataSource.data = this.tasks;
  }

  // Chiudi la modale
  this.modal.closeAll();

  }

  //Funzione Delete Task
  deleteTask(id?: number) {
    // Trova l'indice del task da modificare
    const index = this.tasks.findIndex(t => t.id === id);

  if (index !== -1) {
    // Elimino il task nell'array e aggiorno la lista
    this.tasks.splice(index, 1);
    this.dataSource.data = this.tasks;
  }

  // Chiudi la modale
  this.modal.closeAll();

  }

}

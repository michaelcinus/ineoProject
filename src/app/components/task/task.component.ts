import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from 'src/app/service/task.service';

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

  constructor(
    private modal: MatDialog,
    private taskService: TaskService
  ) {
    this.tasks = this.taskService.getAllTasks();
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

  // Funzione apri modale Add
  openAddModal(modale : any) {
    this.modal.open(modale, {
      width: '500px'
    });
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
  addTask(task: Task) {
    // Passo il nuovo task al service che lo aggiunge
    this.taskService.addTask(task);

    // Aggiorna la lista
    this.dataSource.data = this.taskService.getAllTasks();;

    // Chiudi la modale
    this.modal.closeAll();

    }

  //Funzione Edit Task
  editTask(task: Task) {
  // Passo il task modificato al service che lo modifica
  this.taskService.editTask(task);

  // Aggiorna la lista
  this.dataSource.data = this.taskService.getAllTasks();;

  // Chiudi la modale
  this.modal.closeAll();

  }

  //Funzione Delete Task
  deleteTask(id?: number) {
  // Passo l'id al Service che elimina il task
  this.taskService.deleteTask(id);

  // aggiorno la lista
  this.dataSource.data = this.taskService.getAllTasks();

  // Chiude la modale
  this.modal.closeAll();

  }

}

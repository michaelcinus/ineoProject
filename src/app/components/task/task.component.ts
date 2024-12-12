import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { Tasks } from 'src/app/mocks/tasks'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { style } from '@angular/animations';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})

export class TaskComponent {
  displayedColumns: string[] = ['title', 'description', 'state', 'actions'];
  dataSource : MatTableDataSource<Task>;

  taskSelected?: Task;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private modal: MatDialog,) {
    this.dataSource = new MatTableDataSource(Tasks);
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
    this.taskSelected = task;
    this.modal.open(modale, {
      width: '500px'
    });
  }

  // Funzione apri modale Delete
  openDeleteModal(modale : any, task: Task) {
    this.taskSelected = task;
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

  //Funzione Delete Task
}

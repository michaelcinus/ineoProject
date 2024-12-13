import { Component, ViewChild } from '@angular/core';
import { Task } from 'src/app/models/task';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from 'src/app/service/task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})

export class TaskComponent {
  loading = true;

  displayedColumns: string[] = ['title', 'description', 'status', 'actions'];
  dataSource : MatTableDataSource<Task> = new MatTableDataSource;

  taskForm: FormGroup;
  tasks: Task[] = [];
  taskSelected: Task = this.tasks[0];


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private modal: MatDialog,
    private taskService: TaskService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
  ) {
    // Inizializzo il form
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getAllTask();
  }

  getAllTask(){
    // Ritardo il caricamento dei task
    setTimeout(() => {
      this.taskService.getAllTasks().subscribe({
        next: (res) => {
          this.tasks = res;
          this.dataSource.data = this.tasks;
          this.dataSource.paginator = this.paginator;
          this.loading = false;
        },
        error: (err) => {
          console.error('Errore nel caricamento dei task', err);
          this.loading = false;
        }
      });
    }, 1000);
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
    // Resetto il form
    this.taskForm.reset();
  }

  //Funzione Add Task
  addTask() {
    this.loading = true;
    const taskAdded = this.taskForm.value;
    // Passo il nuovo task al service che lo aggiunge
    this.taskService.addTask(taskAdded).subscribe({
      next : () => {
      // Aggiorna la lista
      this.getAllTask();
      // Chiude la modale
      this.closeModal();
      // Resetto il form
      this.taskForm.reset();
      // apro snackbar di conferma
      this.snackBar.open('La task è stata aggiunta', 'X', {
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        duration: 2000,
        panelClass: ['success-snackbar'],
      });
      },
      error: (err) => {
        //apro snackbar di errore
        this.snackBar.open('Qualcosa è andato storto', 'X', {
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          duration: 2000,
          panelClass: ['error-snackbar'],
        });
      }
    })
  }

  //Funzione Edit Task
  editTask(task: Task) {
    this.loading = true;
    // Passo il task modificato al service che lo modifica
    this.taskService.editTask(task).subscribe({
      next : () => {
        // Aggiorna la lista
        this.getAllTask();
        // Chiude la modale
        this.closeModal();
        // apro snackbar di conferma
        this.snackBar.open('La task è stata modificata', 'X', {
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          duration: 2000,
          panelClass: ['success-snackbar'],
        });
      },
      error: (err) => {
        //apro snackbar di errore
        this.snackBar.open('Qualcosa è andato storto', 'X', {
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          duration: 2000,
          panelClass: ['error-snackbar'],
        });
      }
    });
  }

  //Funzione Delete Task
  deleteTask(id: number) {
    this.loading = true;
    // Passo l'id al Service che elimina il task
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        // Aggiorna la lista
        this.getAllTask();
        // Chiude la modale
        this.closeModal();
        // apro snackbar di conferma
        this.snackBar.open('La task è stata eliminata', 'X', {
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          duration: 2000,
          panelClass: ['success-snackbar'],
        });
      },
      error: (err) => {
        //apro snackbar di errore
        this.snackBar.open('Qualcosa è andato storto', 'X', {
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          duration: 2000,
          panelClass: ['error-snackbar'],
        });
      }
    });
  }

}

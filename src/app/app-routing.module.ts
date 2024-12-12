import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TaskComponent } from './components/task/task.component';
import { ContactComponent } from './components/contact/contact.component';

const routes: Routes = [
  { path: '', component: HomeComponent },  // Ruta per la home
  { path: 'task', component: TaskComponent }, // Ruta per l'header
  { path: 'contact', component: ContactComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

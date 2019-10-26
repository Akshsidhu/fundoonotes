import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DeletedNotesComponent } from './components/deleted-notes/deleted-notes.component';
import { NotesComponent } from './components/notes/notes.component';
import { ArchivedNotesComponent } from './components/archived-notes/archived-notes.component';
import { ServiceComponent } from './components/service/service.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path:'service' , component: ServiceComponent},
  {
    path: 'dashboard', component: DashboardComponent,
    children:[
      {path:'deleted' , component:DeletedNotesComponent},
      {path:'allNotes', component:NotesComponent},
      {path:'', component:NotesComponent},
      {path:'archive', component:ArchivedNotesComponent}
    ]
  },
  { path: 'resetpassword/:token', component: ResetPasswordComponent },
  { path: '**', redirectTo: '/service' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
export const routingComponents = [
                                    LoginComponent,
                                    RegisterComponent,
                                    ResetPasswordComponent,
                                    DeletedNotesComponent,
                                    DashboardComponent
                                  ]

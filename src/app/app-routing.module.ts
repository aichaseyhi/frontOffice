import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashbordComponent } from './components/dash/dashbord/dashbord.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AdministrateurComponent } from './secure/administrateur/administrateur.component';
import { HomeComponent } from './components/dash/home/home.component';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path: 'login', component: LoginComponent},
  {path: 'dashbord', component: DashbordComponent,
  children:[
    { path: 'home', component: HomeComponent },
    { path: 'admin', component: AdministrateurComponent },
  ]},
  {path: 'register', component: RegisterComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

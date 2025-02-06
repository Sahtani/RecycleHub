import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './features/auth/login/login.component';
import {RegisterComponent} from './features/auth/register/register.component';
import {DashboardComponentComponent} from './dashboard-component/dashboard-component.component';
import {AuthGuard} from './guards/auth.guard';

export const routes: Routes = [
  {path: '',component:HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component:RegisterComponent},
  {
    path: 'dashboard',
    component: DashboardComponentComponent,
    canActivate: [AuthGuard],
  }
];

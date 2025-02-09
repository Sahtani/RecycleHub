import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './features/auth/login/login.component';
import {RegisterComponent} from './features/auth/register/register.component';
import {DashboardComponentComponent} from './dashboard-component/dashboard-component.component';
import {AuthGuard} from './guards/auth.guard';
import {ProfileComponent} from './features/profile/profile.component';
import {
  CollectionRequestListComponent
} from './features/collection-request/collection-request/collection-request-list/collection-request-list.component';
import {DashboardComponent} from './features/collection-request/dashboard/dashboard.component';
import {
  CollectionRequestComponent
} from './features/collection-request/collection-request/collection-request.component';
import {
  EditCollectionRequestComponent
} from './features/collection-request/edit-collection-request/edit-collection-request.component';

export const routes: Routes = [
  {path: '',component:HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component:RegisterComponent},
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'requests',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'create-request', component: CollectionRequestComponent },
  { path: 'edit-request/:id', component: EditCollectionRequestComponent },
];

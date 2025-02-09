import { Component } from '@angular/core';
import {CollectionRequestComponent} from '../collection-request/collection-request.component';
import {
  CollectionRequestListComponent
} from '../collection-request/collection-request-list/collection-request-list.component';
import {NavbarComponent} from '../../../shared/navbar/navbar.component';
import {RouterLink} from '@angular/router';
import {SharedButtonComponent} from '../../../shared/shared-button/shared-button.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    CollectionRequestComponent,
    CollectionRequestListComponent,
    NavbarComponent,
    RouterLink,
    SharedButtonComponent
  ],
  templateUrl: './dashboard.component.html',
  standalone: true,
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  disabled: boolean = false;

}

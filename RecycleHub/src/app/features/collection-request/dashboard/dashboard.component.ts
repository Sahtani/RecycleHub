import {Component, OnInit} from '@angular/core';
import {CollectionRequestComponent} from '../collection-request/collection-request.component';
import {
  CollectionRequestListComponent
} from '../collection-request/collection-request-list/collection-request-list.component';
import {NavbarComponent} from '../../../shared/navbar/navbar.component';
import {RouterLink} from '@angular/router';
import {SharedButtonComponent} from '../../../shared/shared-button/shared-button.component';
import {NgClass, NgIf} from '@angular/common';
import {UserRole} from '../../../core/models/user.model';
import {Subscription} from 'rxjs';
import {CollectionRequestService} from '../../../core/services/collection-request.service';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    CollectionRequestComponent,
    CollectionRequestListComponent,
    NavbarComponent,
    RouterLink,
    SharedButtonComponent,
    NgClass,
    NgIf
  ],
  templateUrl: './dashboard.component.html',
  standalone: true,
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  disabled: boolean = false;
  currentUserRole: UserRole | null = null;
  private userSubscription!: Subscription;
  public userRole = UserRole;
  constructor(
    private authService: AuthService
  ) {
  }
  ngOnInit(): void {
    this.userSubscription = this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.currentUserRole = user.role;
      } else {
        this.currentUserRole = null;
      }
    });
  }
}

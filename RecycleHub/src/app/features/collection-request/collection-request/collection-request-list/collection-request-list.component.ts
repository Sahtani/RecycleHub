import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {CollectionRequest} from '../../../../core/models/collection-request.model';
import {User, UserRole} from '../../../../core/models/user.model';
import {Status} from '../../../../core/models/status.enum';
import {CollectionRequestService} from '../../../../core/services/collection-request.service';
import {AuthService} from '../../../../core/services/auth.service';
import {RouterLink} from '@angular/router';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {Carousel} from 'primeng/carousel';
import {PrimeTemplate} from 'primeng/api';

@Component({
  selector: 'app-collection-request-list',
  templateUrl: './collection-request-list.component.html',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    DatePipe,
    Carousel,
    PrimeTemplate,
    NgForOf
  ],
  styleUrls: ['./collection-request-list.component.css']
})
export class CollectionRequestListComponent implements OnInit, OnDestroy {
  requests: CollectionRequest[] = [];
  currentUserRole: UserRole | null = null;
  currentUserEmail: string | null = null;
  public RequestStatus = Status;
  public userRole = UserRole;

  private userSubscription!: Subscription;

  constructor(
    private requestService: CollectionRequestService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.userSubscription = this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.currentUserRole = user.role;
        this.currentUserEmail = user.email;
        this.loadRequests(user);
      } else {
        this.currentUserRole = null;
        this.currentUserEmail = null;
        this.requests = [];
      }
    });
  }

  loadRequests(user: { email: string; address: string }): void {
    this.requestService.getRequests().subscribe({
      next: (allRequests) => {
        if (this.currentUserRole === UserRole.Particular) {
          this.requests = allRequests.filter(r => r.createdBy === user.email);
        } else if (this.currentUserRole === UserRole.Collector) {
          const parts = user.address.split(',');
          const collectorCity = parts.length >= 2 ? parts[1].trim() : '';
          this.requests = allRequests.filter(r =>
            r.collectionAddress.toLowerCase().includes(collectorCity.toLowerCase())
          );
        } else {
          this.requests = allRequests;
        }
      },
      error: (err) => console.error('Error loading requests:', err)
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
  editRequest(request: CollectionRequest): void {
    console.log('Edit request:', request);
  }

  deleteRequest(requestId: string): void {
    if (confirm('Are you sure you want to delete this request?')) {
      this.requestService.deleteRequest(requestId).subscribe({
        next: () => {
          alert('Request deleted successfully.');
          this.loadRequests({email: this.currentUserEmail!, address: ''}); // reload with minimal info
        },
        error: (err) => alert('Error deleting request: ' + err.message)
      });
    }
  }
  getSelectValue(event: Event): string {
    const target = event.target as HTMLSelectElement;
    return target.value;
  }

  updateStatus(request: CollectionRequest, newStatus: string): void {
    if (Object.values(Status).includes(newStatus as Status)) {
      request.status = newStatus as Status;
      this.requestService.updateRequest(request).subscribe({
        next: () => {
          alert('Status updated successfully.');
          this.loadRequests({email: this.currentUserEmail!, address: ''});
        }, error: (err) => alert('Error updating status: ' + err.message)
      });
    } else {
      alert('Invalid status.');
    }
  }

  updateUserPoints(userEmail: string, points: number): void {
    const userData = localStorage.getItem('user');
    if (!userData) return;

    let user: User = JSON.parse(userData);
    if (user.email === userEmail) {
      user.points = (user.points || 0) + points;
      localStorage.setItem('user', JSON.stringify(user));
    }
}}

import { Component, OnInit } from '@angular/core';
import {CollectionRequest} from '../../../../core/models/collection-request.model';
import {Status} from '../../../../core/models/status.enum';
import {CollectionRequestService} from '../../../../core/services/collection-request.service';
import {CommonModule, DatePipe, NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {UserRole} from '../../../../core/models/user.model';
import {AuthService} from '../../../../core/services/auth.service';
import {NavbarComponent} from '../../../../shared/navbar/navbar.component';
import { Swiper } from 'swiper';
import {SwiperOptions} from 'swiper/types';
import {CarouselModule} from 'primeng/carousel';

@Component({
  selector: 'app-collection-request-list',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    NgIf,
    NgForOf,
    NavbarComponent,
    CarouselModule,
    NgOptimizedImage
  ],
  templateUrl: './collection-request-list.component.html',
  styleUrls: ['./collection-request-list.component.css']
})
export class CollectionRequestListComponent implements OnInit {
  requests: CollectionRequest[] = [];
  currentUserRole:  UserRole | null = null;
  userRole = UserRole;

  public RequestStatus = Status;

  constructor(private requestService: CollectionRequestService, private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUserRole = this.authService.currentUserRole;
    this.requestService.getRequests().subscribe({
      next: (reqs) => (this.requests = reqs),
      error: (err) => console.error('Erreur lors du chargement des demandes :', err)
    });
    this.authService.currentUser$.subscribe(user => {
      this.currentUserRole = user ? user.role : null;
    });
  }
  editRequest(request: CollectionRequest): void {

    console.log('Éditer la demande :', request);
  }

  deleteRequest(requestId: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette demande ?')) {
      this.requestService.deleteRequest(requestId).subscribe({
        next: () => {
          alert('Demande supprimée avec succès.');
          this.ngOnInit();
        },
        error: (err) => alert('Erreur lors de la suppression : ' + err.message)
      });
    }
  }

  updateStatus(request: CollectionRequest, newStatus: string): void {
    if (Object.values(Status).includes(newStatus as Status)) {
      request.status = newStatus as Status;
      this.requestService.updateRequest(request).subscribe({
        next: () => {
          alert('Statut mis à jour avec succès.');
          this.ngOnInit();
        },
        error: (err) => alert('Erreur lors de la mise à jour du statut : ' + err.message)
      });
    } else {
      alert('Status invalide.');
    }
  }


}

import { Component, OnInit } from '@angular/core';
import {CollectionRequest} from '../../../../core/models/collection-request.model';
import {Status} from '../../../../core/models/status.enum';
import {CollectionRequestService} from '../../../../core/services/collection-request.service';
import {CommonModule, DatePipe, NgForOf, NgIf} from '@angular/common';
import {UserRole} from '../../../../core/models/user.model';
import {AuthService} from '../../../../core/services/auth.service';
import {NavbarComponent} from '../../../../shared/navbar/navbar.component';
import { Swiper } from 'swiper';
import {SwiperOptions} from 'swiper/types';

@Component({
  selector: 'app-collection-request-list',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    NgIf,
    NgForOf,
    NavbarComponent],
  templateUrl: './collection-request-list.component.html',
  styleUrls: ['./collection-request-list.component.css']
})
export class CollectionRequestListComponent implements OnInit {
  requests: CollectionRequest[] = [];

  currentUserRole:  UserRole | null = null;
//  currentUserRole: 'particular' | 'collector' = 'particular';
  userRole = UserRole;

  // Rendre l'enum accessible dans le template
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
  public swiperConfig: SwiperOptions = {
    slidesPerView: 1,
    navigation: true,
    pagination: { clickable: true },
    loop: true,
    autoplay: { delay: 3000 }
  };

  editRequest(request: CollectionRequest): void {

    console.log('Éditer la demande :', request);
  }

  deleteRequest(requestId: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette demande ?')) {
      this.requestService.deleteRequest(requestId).subscribe({
        next: () => {
          alert('Demande supprimée avec succès.');
          // Rechargez la liste après suppression
          this.ngOnInit();
        },
        error: (err) => alert('Erreur lors de la suppression : ' + err.message)
      });
    }
  }

  updateStatus(request: CollectionRequest, newStatus: string): void {
    request.status = newStatus as Status;
    this.requestService.updateRequest(request).subscribe({
      next: () => {
        alert('Statut mis à jour avec succès.');
        this.ngOnInit();
      },
      error: (err) => alert('Erreur lors de la mise à jour du statut : ' + err.message)
    });
  }
}

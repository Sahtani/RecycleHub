import {Component, OnInit} from '@angular/core';
import {AsyncPipe, DatePipe, NgForOf, NgIf} from '@angular/common';
import {CollectionRequest} from '../../../../core/models/collection-request.model';
import {Status} from '../../../../core/models/status.enum';
import {CollectionRequestService} from '../../../../core/services/collection-request.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-collection-request-list',
  standalone: true,
  imports: [AsyncPipe, NgIf, DatePipe, NgForOf, FormsModule],
  templateUrl: './collection-request-list.component.html',
  styleUrls: ['./collection-request-list.component.css']
})
export class CollectionRequestListComponent implements OnInit {

  requests: CollectionRequest[] = [];
  currentUserRole: 'particular' | 'collector' = 'particular';
  public Status = Status;

  constructor(private requestService: CollectionRequestService) {}
  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.requestService.getRequests().subscribe({
      next: (reqs) => {
        this.requests = reqs;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des demandes :', err);
      }
    });
  }
// Méthodes pour éditer ou supprimer une demande pour un particulier
  editRequest(request: CollectionRequest): void {

    console.log('Éditer la demande :', request);
  }

  deleteRequest(requestId: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette demande ?')) {
      this.requestService.deleteRequest(requestId).subscribe({
        next: () => {
          alert('Demande supprimée avec succès.');
          this.loadRequests(); // Recharge la liste après suppression
        },
        error: (err) => {
          alert('Erreur lors de la suppression : ' + err.message);
        }
      });
    }
  }

  // Méthode pour mettre à jour le statut d'une demande (pour le collecteur)
  updateStatus(request: CollectionRequest, newStatus: string): void {
    // Convertir la valeur reçue en RequestStatus
    request.status = newStatus as Status;
    this.requestService.updateRequest(request).subscribe({
      next: () => {
        alert('Statut mis à jour avec succès.');
        this.loadRequests();
      },
      error: (err) => {
        alert('Erreur lors de la mise à jour du statut : ' + err.message);
      }
    });
  }
}

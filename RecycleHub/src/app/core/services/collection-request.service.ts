import {Injectable} from '@angular/core';
import {CollectionRequest} from '../models/collection-request.model';
import {delay, Observable, of, throwError} from 'rxjs';
import {v4 as uuidv4} from 'uuid';
import {Status} from '../models/status.enum';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class CollectionRequestService {
  private storageKey = 'collectionRequests';
  constructor(private authservice: AuthService) {
    }

  private getRequestsFromStorage(): CollectionRequest[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) as CollectionRequest[] : [];
  }
  private saveRequestsToStorage(requests: CollectionRequest[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(requests));
  }
 // create new collecte request
  createRequest(request: CollectionRequest, currentUserRole: string): Observable<CollectionRequest> {
    const requests = this.getRequestsFromStorage();
    const loggedUser = this.authservice.loggedUser; // Récupérer l'utilisateur connecté

    if (!loggedUser) {
      return throwError(() => new Error('User not authenticated.'));
    }

    if (currentUserRole === 'particular') {
      // ✅ Filtrer uniquement les demandes créées par l'utilisateur connecté
      const userPendingRequests = requests.filter(r =>
        r.status === Status.EnAttente && r.createdBy === loggedUser.email
      );

      if (userPendingRequests.length >= 3) {
        return throwError(() => new Error('Maximum 3 pending requests per user.'));
      }
    }

    request.id = uuidv4();
    request.createdBy = loggedUser.email;
    request.status = Status.EnAttente;

    requests.push(request);
    this.saveRequestsToStorage(requests);

    return of(request).pipe(delay(500));
  }


  getRequests(): Observable<CollectionRequest[]> {
    const requests = this.getRequestsFromStorage();
    return of(requests).pipe(delay(500));
  }


  updateRequest(request: CollectionRequest): Observable<CollectionRequest> {
    const requests = this.getRequestsFromStorage();
    const index = requests.findIndex(r => r.id === request.id);
    if (index !== -1) {
      requests[index] = request;
      this.saveRequestsToStorage(requests);
      return of(request).pipe(delay(500));
    } else {
      throw new Error('Demande introuvable');
    }
  }
  deleteRequest(requestId: string): Observable<void> {
    let requests = this.getRequestsFromStorage();
    requests = requests.filter(r => r.id !== requestId);
    this.saveRequestsToStorage(requests);
    return of(void 0).pipe(delay(500));
  }

  getRequestsByCity(city: string): Observable<CollectionRequest[]> {
    const allRequests: CollectionRequest[] = JSON.parse(localStorage.getItem('collectionRequests') || '[]');
    const filteredRequests = allRequests.filter(request =>
      request.collectionAddress.toLowerCase().includes(city.toLowerCase())
    );
    return of(filteredRequests).pipe(delay(500));
  }

}

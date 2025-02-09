import {Injectable} from '@angular/core';
import {CollectionRequest} from '../models/collection-request.model';
import {delay, Observable, of, throwError} from 'rxjs';
import {v4 as uuidv4} from 'uuid';
import {Status} from '../models/status.enum';

@Injectable({
  providedIn: 'root'
})

export class CollectionRequestService {
  private storageKey = 'collectionRequests';
  constructor() {}

  private getRequestsFromStorage(): CollectionRequest[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) as CollectionRequest[] : [];
  }
  // tableau des demands dans localStorage :
  private saveRequestsToStorage(requests: CollectionRequest[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(requests));
  }
 // create new collecte request
  createRequest(request: CollectionRequest, currentUserRole: string): Observable<CollectionRequest> {
    const requests = this.getRequestsFromStorage();
    if (currentUserRole === 'particular') {
      const pendingCount = requests.filter(r=> r.status === Status.EnAttente).length;
      if (pendingCount >= 3) {
        return throwError(() => new Error('Maximum 3 demandes simultanées non finalisées autorisées.'));
      }
    }
    // generate unique id :
    request.id = uuidv4();
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

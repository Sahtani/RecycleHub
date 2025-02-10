import {Injectable} from '@angular/core';
import {User, UserRole} from '../models/user.model';
import {BehaviorSubject, delay, Observable, of, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor() {
  }

  register$(userData: User): Observable<User> {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const newUser = {...userData, role: userData.role ?? UserRole.Particular};
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    this.currentUserSubject.next(newUser);
    return of(newUser).pipe(delay(500));
  }


  login$(email: string, password: string): Observable<User> {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find(user => user.email === email && user.password === password);

    if (foundUser) {
      this.currentUserSubject.next(foundUser);
      localStorage.setItem('loggedInUser', JSON.stringify(foundUser));
      return of(foundUser).pipe(delay(500));
    }

    return throwError(() => new Error('Invalid credentials')).pipe(delay(500));
  }


  updateUser(user: User): Observable<User> {
    const updatedUser = {...user};
    localStorage.setItem('user', JSON.stringify(updatedUser));
    this.currentUserSubject.next(updatedUser);
    return of(updatedUser).pipe(delay(500));
  }

  deleteUserAccount(): Observable<void> {
    localStorage.removeItem('user');
    console.log('user deleted');
    this.currentUserSubject.next(null);
    return of(void 0).pipe(delay(500));
  }

  public get currentUserRole(): UserRole | null {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      const user: User = JSON.parse(loggedInUser);
      return user.role;
    }
    return null;
  }

  // @ts-ignore
  public get loggedUser(): User | null {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      return JSON.parse(loggedInUser) as User;
    }
    return null;

}}

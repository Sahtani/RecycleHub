import { Injectable } from '@angular/core';
import {User, UserRole} from '../models/user.model';
import {BehaviorSubject, defer, delay, Observable, of, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  // Observable accessible par d'autres parties de l'application
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor() {}


 /* register$(userData: User): Observable<User> {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
    console.log('registration successful !');
    return of(userData).pipe(delay(500));

  }*/

  register$(userData: User): Observable<User> {

    const mutableUserData = { ...userData };
    if (!mutableUserData.role) {
      mutableUserData.role = UserRole.Particular;
    }

    localStorage.setItem('user', JSON.stringify(mutableUserData));
    console.log('registration successful!');
    return of(mutableUserData).pipe(delay(500));
  }

  login$(email: string, password: string): Observable<User> {
    const userData = localStorage.getItem('user');
    if (userData) {
      const foundUser: User = JSON.parse(userData);
      if (foundUser.email === email && foundUser.password === password) {
        console.log('login successful and user data is valid!');
        return of(foundUser).pipe(delay(500));
      }
    }
    return throwError(() => new Error('Invalid credentials')).pipe(delay(500));
  }

  updateUser(user: User): Observable<User> {
    const updatedUser = { ...user };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    return of(user).pipe(delay(500));
  }

  deleteUserAccount(): Observable<void> {

    localStorage.removeItem('user');
    console.log('user deleted');
    console.log(localStorage);
    localStorage.clear();

    return of(void 0).pipe(delay(500));
  }

  public get currentUserRole(): UserRole | null {
    const user = this.currentUserSubject.getValue();
    return user ? user.role : null;
  }



}

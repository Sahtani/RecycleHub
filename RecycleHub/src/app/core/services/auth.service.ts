import { Injectable } from '@angular/core';
import {User} from '../models/user.model';
import {delay, Observable, of, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  register$(userData: User): Observable<User> {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
    console.log('registration successful !');
    return of(userData).pipe(delay(500));

  }

  login$(email: string, password: string): Observable<User> {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find((user: User) => user.email === email && user.password === password);
    if (foundUser) {
      console.log('login successful and users data is valid  !');
      return of(foundUser).pipe(delay(500));

    } else {
      console.log('login failed !');
      return throwError(() => new Error('Invalid credentials')).pipe(delay(500));
    }
  }

  updateUser(user: User): Observable<User> {
    const updatedUser = { ...user };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    console.log('data updated ');
    // Retourne l'utilisateur mis à jour après un délai simulé de 500 ms
    return of(user).pipe(delay(500));
  }



}

import { Injectable } from '@angular/core';
import {User} from '../models/user.model';
import {delay, Observable, of, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

 /* register$(userData: User): Observable<User> {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
    console.log('registration successful !');
    return of(userData).pipe(delay(500));

  }*/
  register$(userData: User): Observable<User> {
    localStorage.setItem('user', JSON.stringify(userData));
    console.log('registration successful!');
    return of(userData).pipe(delay(500));
  }


  login$(email: string, password: string): Observable<User> {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find((user: User) => user.email === email && user.password === password);
    if (foundUser) {
      console.log('login successful and users data is valid  !');
      return of(foundUser).pipe(delay(500));

    } else {
      return throwError(() => new Error('Invalid credentials')).pipe(delay(500));
    }
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



}

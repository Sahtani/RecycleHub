import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {AuthState} from '../auth/store/state/auth.state';
import {User} from '../../core/models/user.model';
import {Store} from '@ngrx/store';
import {AsyncPipe, NgIf} from '@angular/common';
import {NavbarComponent} from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-profile',
  imports: [
    AsyncPipe,
    NgIf,
    NavbarComponent
  ],
  templateUrl: './profile.component.html',
  standalone: true,
  styleUrl: './profile.component.css'
})

export class ProfileComponent implements OnInit{
 user$!: Observable<User | null>;

 constructor(private store: Store<{ auth: AuthState}>) {}

  ngOnInit(): void {
    this.user$ = this.store.select((state) => state.auth.user);
  }


}

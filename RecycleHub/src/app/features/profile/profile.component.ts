import {Component, OnInit} from '@angular/core';

import * as AuthActions from '../auth/store/actions/auth.actions';
import {Observable} from 'rxjs';
import {AuthState} from '../auth/store/state/auth.state';
import {User} from '../../core/models/user.model';
import {Store} from '@ngrx/store';
import {AsyncPipe, NgIf} from '@angular/common';
import {NavbarComponent} from '../../shared/navbar/navbar.component';
import {SharedButtonComponent} from '../../shared/shared-button/shared-button.component';
import {MatDialog} from '@angular/material/dialog';
import {EditProfilePopUpComponent} from './edit-profile-pop-up/edit-profile-pop-up.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [
    AsyncPipe,
    NgIf,
    NavbarComponent,
    SharedButtonComponent
  ],
  templateUrl: './profile.component.html',
  standalone: true,
  styleUrl: './profile.component.css'
})

export class ProfileComponent implements OnInit{
  disabled: boolean = false;
  user$!: Observable<User | null>;
  user: User | null = null;

  constructor(private dialog: MatDialog,private store: Store<{ auth: AuthState}>, private router: Router) {}

  ngOnInit(): void {
    this.user$ = this.store.select((state) => state.auth.user);
    this.user$.subscribe(u => {
      this.user = u;
      if (u === null) {
        this.router.navigate(['/login']).then(() => {
          console.log('Navigation réussie');
        }).catch((error) => {
          console.error('Erreur de navigation :', error);
        });
      }
    });
  }
  openEditProfilePopup(): void {
    const userData = this.user ? JSON.parse(JSON.stringify(this.user)) : null;
    const dialogRef = this.dialog.open(EditProfilePopUpComponent, {
      width: '400px',
      data: userData
     // data: { ...this.user$} // On transmet une copie d'utilisateur  (immutable )
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Updated profile:', result);

       // this.store.dispatch(AuthActions.updateUser({user: {...result} }));
        this.store.dispatch(AuthActions.updateUser({ user: JSON.parse(JSON.stringify(result)) }));


        //  this.user$ = {...result};
      }
    });
  }

  onDeleteAccount(): void {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      this.store.dispatch(AuthActions.deleteUserAccount());
    }
  }

}

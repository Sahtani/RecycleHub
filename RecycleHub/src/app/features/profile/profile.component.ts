import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {AuthState} from '../auth/store/state/auth.state';
import {User} from '../../core/models/user.model';
import {Store} from '@ngrx/store';
import {AsyncPipe, NgIf} from '@angular/common';
import {NavbarComponent} from '../../shared/navbar/navbar.component';
import {SharedButtonComponent} from '../../shared/shared-button/shared-button.component';
import {MatDialog} from '@angular/material/dialog';
import {EditProfilePopUpComponent} from './edit-profile-pop-up/edit-profile-pop-up.component';

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

 constructor(private dialog: MatDialog,
   private store: Store<{ auth: AuthState}>) {}

  ngOnInit(): void {
    this.user$ = this.store.select((state) => state.auth.user);
  }
  openEditProfilePopup(): void {
    const dialogRef = this.dialog.open(EditProfilePopUpComponent, {
      width: '400px',
      data: { ...this.user$} // On transmet une copie des données utilisateur
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Ici, vous pouvez mettre à jour le profil (ex. dispatcher une action NgRx)
        console.log('Updated profile:', result);
        // Mettez à jour vos données locales ou lancez une mise à jour via le store
        this.user$ = result;
      }
    });
  }

}

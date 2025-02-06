import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

import * as AuthActions from '../store/actions/auth.actions';
import {AuthState} from '../store/state/auth.state';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  standalone: true,
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  userForm!: FormGroup ;

  ngOnInit() {
    this.userForm = new FormGroup(
      {
        firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        address: new FormControl('', [Validators.required]),
        phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
        dateOfBirth: new FormControl('')

      });
  }
  constructor(private store: Store<{auth: AuthState}>, private router: Router) {
    this.store.select('auth').pipe(
      tap((state) => {
        if(state.user) {
          this.router.navigate(['/login']).then(() => {
            console.log('Navigation réussie');
          }).catch((error) => {
            console.error('Erreur de navigation :', error);
          });
        }
        if (state.error) {
          alert(state.error);
        }
      })
    ).subscribe();
  }

  onSubmit() {
    if (this.userForm?.valid){
      console.log("form valide");
      this.store.dispatch(AuthActions.register({ user: this.userForm.value}))
    }
    else {
      console.log('form invalide');
    }
  }

}

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import * as AuthActions from '../store/actions/auth.actions';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {AuthState} from '../store/state/auth.state';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit{
  authState$: Observable<AuthState>;
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<{ auth: AuthState }>, private router: Router) {
    this.authState$ = this.store.select('auth').pipe(
      tap((state) => {
        if (state.user) {
          // Rediriger en cas de connexion réussie
          this.router.navigate(['/']).then(() => {
            console.log('Navigation réussie');
          }).catch((error) => {
            console.error('Erreur de navigation :', error);
          });
        }
        if (state.error) {
          alert(state.error);
        }
      })
    );
  }

  ngOnInit() {
    this.initializeForm();
  }
  private initializeForm() {
  this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    const email = this.loginForm.get('email')?.value ?? '';
    const password = this.loginForm.get('password')?.value ?? '';

    if (email && password) {
      this.store.dispatch(AuthActions.login({ email, password }));
      console.log('login done ');
    } else {
      alert('Veuillez remplir tous les champs.');
    }
  }


}

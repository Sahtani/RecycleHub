import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import {Router, RouterLink} from '@angular/router';
import * as AuthActions from '../store/actions/auth.actions';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthState } from '../store/state/auth.state';
import {NavbarComponent} from '../../../shared/navbar/navbar.component';
import {HeaderFormComponent} from '../../../shared/header-form/header-form.component';
import {SharedButtonComponent} from '../../../shared/shared-button/shared-button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent, RouterLink, HeaderFormComponent, SharedButtonComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {
  authState$: Observable<AuthState>;
  loginForm!: FormGroup;
  private subscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private store: Store<{ auth: AuthState }>,
    private router: Router
  ) {
    this.authState$ = this.store.select('auth');
  }

  ngOnInit(): void {
    this.initializeForm();

    this.subscription.add(
      this.authState$
        .pipe(
          tap((state) => {
            if (state.user) {
              this.router
                .navigate(['/profile'])
                .then(() => console.log('Navigation réussie'))
                .catch((error) => console.error('Erreur de navigation :', error));
            }
            if (state.error) {
              alert(state.error);
            }
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private initializeForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onLogin(): void {
    const email = this.loginForm.get('email')?.value ?? '';
    const password = this.loginForm.get('password')?.value ?? '';
    if (email && password) {
      this.store.dispatch(AuthActions.login({ email, password }));
      console.log('Login dispatché');
    } else {
      alert('Veuillez remplir tous les champs.');
    }
  }
}

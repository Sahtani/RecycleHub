import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as AuthActions from '../actions/auth.actions';
import {catchError, map, mergeMap, of} from 'rxjs';
import {AuthService} from '../../../../core/services/auth.service';

@Injectable()
export class AuthEffects {
  private actions$: Actions = inject(Actions);
  private authService: AuthService = inject(AuthService)

  login$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.login), mergeMap(({email, password}) => this.authService.login$(email, password).pipe(
      map((user) => AuthActions.loginSuccess({user})),
      catchError((error) => of(AuthActions.loginFailure({error: error.message})))
    ))
  ));
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      mergeMap(({user}) =>
        this.authService.register$(user).pipe(
          map((newUser) => AuthActions.registerSuccess({user: newUser})),
          catchError((error) => of(AuthActions.registerFailure({error: error.message})))
        )
      )
    )
  );
  // update profile
  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.updateUser),
      mergeMap(({ user }) =>
        this.authService.updateUser(user).pipe(
          map((updatedUser) => AuthActions.updateUserSuccess({ user: updatedUser })),
          catchError((error) => of(AuthActions.updateUserFailure({ error: error.message })))
        )
      )
    )
  );

}

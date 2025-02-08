import { AuthState, initialState } from '../state/auth.state';
import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';

export const authReducer = createReducer(
  initialState,
  // Login / Register: démarre le chargement
  on(AuthActions.login, AuthActions.register, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  // Login / Register Success: on stocke l'utilisateur (remplace l'ancien)
  on(AuthActions.loginSuccess, AuthActions.registerSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false
  })),
  // Login / Register Failure: on stocke l'erreur
  on(AuthActions.loginFailure, AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  // Update profile: démarre le chargement
  on(AuthActions.updateUser, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  // Update profile Success: on met à jour l'utilisateur
  on(AuthActions.updateUserSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false
  })),
  // Update profile Failure: on stocke l'erreur
  on(AuthActions.updateUserFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  // Delete user account: démarre le chargement
  on(AuthActions.deleteUserAccount, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  // Delete user account Success: on supprime l'utilisateur (user devient null)
  on(AuthActions.deleteUserAccountSuccess, (state) => ({
    ...state,
    user: null,
    loading: false
  })),
  // Delete user account Failure: on stocke l'erreur
  on(AuthActions.deleteUserAccountFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);

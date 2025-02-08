import {AuthState, initialState} from '../state/auth.state';
import {createReducer, on} from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';


export const authReducer = createReducer(initialState,
  on(AuthActions.login, AuthActions.register, (state) => ({
    ...state,
      loading: true,
      error: null,
  })),
  // Succès
  on(AuthActions.loginSuccess, AuthActions.registerSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
  })),
  // Échec
  on(AuthActions.loginFailure, AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
// update profile
on(AuthActions.updateUser, (state) => ({
  ...state,
  loading: true,
  error: null,
})),
  on(AuthActions.updateUserSuccess, (state, { user }) => ({
    ...state,
    user: user,
    loading: false,
  })),
  on(AuthActions.updateUserFailure, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
  }))
);

import {createAction, props} from '@ngrx/store';
import {User} from '../../../../core/models/user.model';

  //login actions
export const login = createAction('[Auth] Login ', props<{email: string; password: string}>());
export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: User }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

// register actions
export const register = createAction(
  '[Auth] Register',
  props<{ user: User }>()
);

export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ user: User }>()
);

export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: string }>()
);

// Update actions
export const updateUser = createAction(
  '[Auth] Update User',
  props<{ user: User }>()
);

export const updateUserSuccess = createAction(
  '[Auth] Update User Success',
  props<{ user: User }>()
);

export const updateUserFailure = createAction(
  '[Auth] Update User Failure',
  props<{ error: string }>()
);

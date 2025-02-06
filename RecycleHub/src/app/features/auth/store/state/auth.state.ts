import {User} from '../../model/user.model';

export interface AuthState {
  user: User | null;
  error: string | null;
  loading: boolean;
}
export const initialState: AuthState = {
  user: null,
  error: null,
  loading: false,
}

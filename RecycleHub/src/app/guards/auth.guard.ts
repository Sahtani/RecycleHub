import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot, UrlTree
} from '@angular/router';
import {Store} from '@ngrx/store';
import {AuthState} from '../features/auth/store/state/auth.state';
import {map, Observable, take} from 'rxjs';


@Injectable({ providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<{ auth: AuthState}>, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.store.select('auth').pipe(
      take(1),
      map(authState => {
        if(authState.user) {
          return true;
        }
        return this.router.createUrlTree(['/login']);
      })
    )
  }

}

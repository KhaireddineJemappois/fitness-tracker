import { AuthService } from 'src/app/auth/auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable, take } from 'rxjs';
import * as fromRoot from '../app.reducer';
import { Store } from '@ngrx/store';
@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  /**
   *
   */
  constructor(
    private store: Store<fromRoot.State>
  ) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.store.select(fromRoot.getIsAuth).pipe(take(1));
    // this.router.navigate(['/login']);
    // return false;
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot // :boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>
  ) {
    return this.store.select(fromRoot.getIsAuth).pipe(take(1));
  }
}

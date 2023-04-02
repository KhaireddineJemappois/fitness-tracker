import { AuthService } from 'src/app/auth/auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
@Injectable()
export class AuthGuard implements CanActivate,CanLoad {
  /**
   *
   */
  constructor(private authService: AuthService, private router: Router) {}
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.authService.isAuth()) return true;
    this.router.navigate(['/login']);
    return false;
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot // :boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>
  ) {
    if (this.authService.isAuth()) return true;
    this.router.navigate(['/login']);
    return false;
  }
}

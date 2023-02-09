import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private route: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (sessionStorage.getItem('username') != null) {
      let roles = sessionStorage.getItem('roles')
        ? JSON.parse(sessionStorage.getItem('roles') || '{}')
        : [];
      console.log(roles);
      for (let i = 0; i < roles.length; i++) {
        if (roles[i] == 'ADMIN') {
          return true;
        } else {
          alert('access denied !');
          this.route.navigate(['user']);
          return false;
        }
      }
      return true;
    } else {
      alert('Login first !');
      this.route.navigate(['user']);
      return false;
    }
  }
}

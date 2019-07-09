import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthHelper} from '../services/security/auth.helper';
import {User} from '../../main/models/user.model';

@Injectable()
export class AccountGuard implements CanActivate {

  private user: User;

  constructor(private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    this.user = JSON.parse(localStorage.getItem(AuthHelper.USER_ID));

    debugger;
    if (!this.user || !this.user.profile) {
      this.router.navigate(['/login']);
    }
    return true;
  }
}

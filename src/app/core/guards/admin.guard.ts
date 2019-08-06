import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthHelper} from '../services/security/auth.helper';
import {User} from '../../main/models/user.model';
import {ProfileTypeEnum} from '../../shared/models/user.model';
import {CommonUtil} from '../helpers/common.util';

@Injectable()
export class AdminGuard implements CanActivate {

  private user: User;

  constructor(private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    this.user = JSON.parse(localStorage.getItem(AuthHelper.USER_ID));
    const token = CommonUtil.getCookie(AuthHelper.TOKEN_ID);

    if (token && this.user && this.user.profile) {
      if (this.user.profile.title !== ProfileTypeEnum.ADMIN) {
        this.router.navigate(['/home']);
      }
    } else {
      this.router.navigate(['/login']);
    }
    return true;
  }
}

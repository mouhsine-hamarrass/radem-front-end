import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthHelper} from '../services/security/auth.helper';
import {User} from '../../main/models/user.model';
import {ProfileTypeEnum} from '../../shared/models/user.model';

@Injectable()
export class ClientGuard implements CanActivate {

  private user: User;

  constructor(private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    this.user = JSON.parse(localStorage.getItem(AuthHelper.USER_ID));

    if (this.user && this.user.profile) {
      if (this.user.profile.title !== ProfileTypeEnum.CLIENT) {
        this.router.navigate(['/admin']);
      }
    }
    return true;
  }
}

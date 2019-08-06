import {Component, OnInit} from '@angular/core';
import {ROUTES} from './second-navbar-routes.config';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../main/models/user.model';
import {ROUTES_OFFLINE} from './second-navbar-routes-offline.config';
import {AuthHelper} from '../../core/services/security/auth.helper';
import {ADMIN_ROUTES} from './second-navbar-admin-routes.config';
import {ProfileTypeEnum} from '../models/user.model';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {OAuthService} from '../../core/services/security/oauth.service';

declare var $: any;


@Component({
  selector: 'app-second-navbar',
  templateUrl: './second-navbar.component.html',
  styleUrls: ['./second-navbar.component.scss']
})
export class SecondNavbarComponent implements OnInit {
  public user: User;
  public menuItems: any[];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private oauthService: OAuthService,
              private toastrService: ToastrService,
              private translate: TranslateService) {
  }

  ngOnInit() {
    if (localStorage.getItem(AuthHelper.USER_ID)) {
      this.user = JSON.parse(localStorage.getItem(AuthHelper.USER_ID));
    }
    $.getScript('./assets/app/js/core/app-menu.js');
    $.getScript('./assets/app/js/core/app.js');

    if (this.user && this.user.profile && this.user.profile.title) {
      if (this.user.profile.title === ProfileTypeEnum.ADMIN) {
        this.menuItems = ADMIN_ROUTES.filter(menuItem => menuItem);

      } else if (this.user.profile.title === ProfileTypeEnum.CLIENT) {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
      } else {
        this.logout();
      }
    } else {
      this.menuItems = ROUTES_OFFLINE.filter(menuItem => menuItem);
    }
  }

  public logout() {
    this.oauthService.logout();
    this.toastrService.success(this.translate.instant('SEE_YOU_SOON'), '', {timeOut: 1000});
    this.router.navigate(['/login']);
  }
}

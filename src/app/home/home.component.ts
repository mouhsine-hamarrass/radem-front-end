import {Component, OnInit} from '@angular/core';
import {AuthHelper} from '../core/services/security/auth.helper';
import {Router} from '@angular/router';
import {UserAccountType, UserProfile, ProfileTypeEnum} from '../shared/models/user.model';
import {NgxPermissionsService} from 'ngx-permissions';
import * as _ from 'underscore';
import {User} from '../main/models/user.model';
import {CommonService} from '../main/services/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private user: User;

  constructor(private router: Router,
              private commonService: CommonService,
              private permissionsService: NgxPermissionsService) {
  }

  ngOnInit() {
    if (localStorage.getItem(AuthHelper.USER_ID)) {
      this.user = JSON.parse(localStorage.getItem(AuthHelper.USER_ID));
      let index: any = null;

      switch (this.user.profile.id) {
        case ProfileTypeEnum.ROOT:
          this.user.profileType = ProfileTypeEnum.ROOT;
          localStorage.setItem(AuthHelper.USER_ID, JSON.stringify(this.user));
          /*
          index = _.findIndex(this.user.authorities, function (o: any) {
            return o.category === 'ADMINISTRATION';
          });
          */
          this.commonService.permission(this.user.authorities[index]);
          this.router.navigate(['admin']);
          break;
        case ProfileTypeEnum.ADMIN:
          this.user.profileType = ProfileTypeEnum.ADMIN;
          localStorage.setItem(AuthHelper.USER_ID, JSON.stringify(this.user));
          /*
          index = _.findIndex(this.user.authorities, function (o: any) {
            return o.category === 'ADMINISTRATION';
          });
          */
          this.commonService.permission(this.user.authorities[index]);
          this.router.navigate(['admin']);
          break;
        case ProfileTypeEnum.AGENT:
          this.user.profileType = ProfileTypeEnum.AGENT;
          localStorage.setItem(AuthHelper.USER_ID, JSON.stringify(this.user));
          /*
          index = _.findIndex(this.user.authorities, function (o: any) {
            return o.category === 'AGENT';
          });
          */
          this.commonService.permission(this.user.authorities[index]);
          this.router.navigate(['admin']);
          break;
        case ProfileTypeEnum.CLIENT:
          this.user.profileType = ProfileTypeEnum.CLIENT;
          localStorage.setItem(AuthHelper.USER_ID, JSON.stringify(this.user));
          /*
          index = _.findIndex(this.user.authorities, function (o: any) {
            return o.category === 'CLIENT';
          });
          */
          this.commonService.permission(this.user.authorities[index]);
          this.router.navigate(['/home']);
          break;
        default:
      }
    } else {
      this.router.navigate(['/login']);
    }
  }
}

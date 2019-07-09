import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
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
              private renderer: Renderer2,
              private commonService: CommonService,
              private permissionsService: NgxPermissionsService) {
  }

  ngOnInit() {
    this.renderer.setStyle(document.body, 'margin-left', '30px');
    this.renderer.setStyle(document.body, 'margin-right', '30px');
    if (localStorage.getItem(AuthHelper.USER_ID)) {
      this.user = JSON.parse(localStorage.getItem(AuthHelper.USER_ID));
      const index: any = null;
      const authorities = {
        permissions: [],
        roles: [],
        category: null
      };
      switch (this.user.profile.title) {
        case ProfileTypeEnum.ADMIN:
          this.user.profileType = ProfileTypeEnum.ADMIN;
          this.router.navigate(['admin']);
          break;
        case ProfileTypeEnum.CLIENT:
          this.user.profileType = ProfileTypeEnum.CLIENT;
          this.router.navigate(['/home']);
          break;
        default:
      }
      authorities.permissions = this.user.authorities;
      authorities.category = this.user.profile.title;
      authorities.roles.push(this.user.profile.title);
      localStorage.setItem(AuthHelper.USER_ID, JSON.stringify(this.user));

      // this.commonService.permission(authorities);
    } else {
      this.router.navigate(['/login']);
    }
  }
}

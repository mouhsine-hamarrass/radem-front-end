import {Component, OnInit} from '@angular/core';
import {OAuthService} from '../../../../core/services/security/oauth.service';
import {Router} from '@angular/router';
import {AuthHelper} from '../../../../core/services/security/auth.helper';
import {User} from '../../../core/models/main-user.model';
import {environment} from '../../../../../environments/environment';
import {UtilsService} from '../../../core/services/utils.service';

@Component({
   selector: 'app-navbar',
   templateUrl: 'navbar.component.html',
   styleUrls: ['navbar.component.scss']
})
export class NavbarComponent implements OnInit {
   public user: User;
   public applogo: string;

   constructor(private oauthService: OAuthService,
               private utilsService: UtilsService,
               private router: Router) {
   }

   ngOnInit() {
      this.applogo = environment.appLogo;
      if (localStorage.getItem(AuthHelper.USER_ID)) {
         this.user = JSON.parse(localStorage.getItem(AuthHelper.USER_ID));
         this.user.avatar = this.user.avatar || environment.defaultAvatar;
      }
   }

   public logout() {
      this.oauthService.logout();
      this.router.navigate(['/login']);
   }

}

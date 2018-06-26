import {Component, OnInit} from '@angular/core';
import {OAuthService} from '../../../../core/services/security/oauth.service';
import {Router} from '@angular/router';
import {AuthHelper} from '../../../../core/services/security/auth.helper';
import {User} from '../../../core/models/main-user.model';
import {environment} from '../../../../../environments/environment';
import {UtilsService} from '../../../core/services/utils.service';
import {BsDropdownConfig} from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.scss'],
  providers: [{ provide: BsDropdownConfig, useValue: { autoClose: true } }]
})
export class NavbarComponent implements OnInit {
  public user: User;
  public applogo: string;
  items: string[] = [
    'The first choice!',
    'And another choice for you.',
    'but wait! A third!'
  ];
  onHidden(): void {
    console.log('Dropdown is hidden');
  }

  onShown(): void {
    console.log('Dropdown is shown');
  }

  isOpenChange(): void {
    console.log('Dropdown state is changed');
  }

  constructor(private oauthService: OAuthService,
              private utilsService: UtilsService,
              private router: Router) {
  }



  ngOnInit() {
    this.applogo = environment.appLogo;
    if (localStorage.getItem(AuthHelper.USER_ID)) {
      this.user = JSON.parse(localStorage.getItem(AuthHelper.USER_ID));
      // this.user.avatar = this.user.avatar || environment.defaultAvatar;
    }
  }

  public logout() {
    this.oauthService.logout();
    this.router.navigate(['/login']);
  }

}

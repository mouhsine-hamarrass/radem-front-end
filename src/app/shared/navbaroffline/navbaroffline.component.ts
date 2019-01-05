import {Component, OnInit} from '@angular/core';
import {OAuthService} from '../../core/services/security/oauth.service';
import {UtilsService} from '../../main/services/utils.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {User} from '../../main/models/user.model';
import {environment} from '../../../environments/environment';
import {AuthHelper} from '../../core/services/security/auth.helper';
import {HomeService} from '../../main/services/home.service';

@Component({
  selector: 'app-navbaroffline',
  templateUrl: './navbaroffline.component.html',
  styleUrls: ['./navbaroffline.component.scss']
})
export class NavbarofflineComponent implements OnInit {

  public user: User;
  public applogo: string;
  alerts: Array<any> = [];

  constructor(private oauthService: OAuthService,
              private utilsService: UtilsService,
              private homeService: HomeService,
              private toastrService: ToastrService,
              private router: Router) {
  }

  ngOnInit() {
    this.applogo = environment.appLogo;
    if (localStorage.getItem(AuthHelper.USER_ID)) {
      this.user = JSON.parse(localStorage.getItem(AuthHelper.USER_ID));
      this.user.avatar = this.user.avatar || environment.defaultAvatar;
    }
    this.getNotifications();
  }

  getNotifications() {
    this.homeService.getAlertsNotification().subscribe(response => {
      if (response && response.data)
        this.alerts = response.data;
    }, err => {
    });
  }


  readNotification(id, $index) {
    this.homeService.readAlertNotification(id).subscribe(response => {
      this.alerts.splice($index, 1);
    }, err => {

    })
  }

  public logout() {
    this.oauthService.logout();
    this.toastrService.success('À bientôt', '', {timeOut: 1000});
    this.router.navigate(['/login']);
  }
}

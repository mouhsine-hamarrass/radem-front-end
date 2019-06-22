import {AfterViewInit, Component, OnInit} from '@angular/core';
import {OAuthService} from '../../core/services/security/oauth.service';
import {UtilsService} from '../../main/services/utils.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../main/models/user.model';
import {environment} from '../../../environments/environment';
import {AuthHelper} from '../../core/services/security/auth.helper';
import {HomeService} from '../../main/services/home.service';
import {TranslateService} from '@ngx-translate/core';
import {AlertNotificationModel} from '../../main/models/alert-notification.model';
import {AlertNotificationStatus} from '../models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit, AfterViewInit {
  public user: User;
  public applogo: string;
  public href: string;
  alerts: Array<AlertNotificationModel> = [];

  constructor(private oauthService: OAuthService,
              private utilsService: UtilsService,
              private homeService: HomeService,
              private toastrService: ToastrService,
              private translate: TranslateService,
              private router: Router,
              private  activatedRoute: ActivatedRoute) {
  }

  ngAfterViewInit(): void {

  }


  ngOnInit() {
    this.applogo = environment.appLogo;
    if (localStorage.getItem(AuthHelper.USER_ID)) {
      this.user = JSON.parse(localStorage.getItem(AuthHelper.USER_ID));
      this.user.avatar = this.user.avatar || environment.defaultAvatar;
    }
    this.href = this.router.url;
    this.href = this.href.substr(1, 5);

    if (this.user && this.user.id && this.href !== 'admin' && !this.user.admin) {
      this.getNotifications();
    }
  }

  getNotifications() {

    this.homeService.getAlertsNotification(0, 10).subscribe(response => {
      if (response && response.data) {
        this.alerts = response.data['content'];
      }
    }, err => {
    });
  }

  detailNotification(notification: AlertNotificationModel, $index) {
    if (notification && notification.alert && notification.alert.type) {

      switch (notification.alert.type.toUpperCase()) {
        case 'ABONNEMENT':
          this.router.navigate(['/services/subscription-detail/', notification.target]);
          break;
        case 'RESILIATION':
          this.router.navigate(['/services/cancellation-detail/', notification.target]);
          break;
        case 'REMBOURSEMENT':
          this.router.navigate(['/services/refund-detail/', notification.target]);
          break;
        case 'BRANCHEMENT':
          this.router.navigate(['/services/embranchment-detail/', notification.target]);
          break;
        default:
          break;
      }
    }
    this.homeService.readAlertNotification(notification.id).subscribe(response => {
      if (response && response.data) {
        this.alerts.splice($index, 1, response.data);
      }

    }, err => {
    });
  }

  public logout() {
    this.oauthService.logout();
    this.toastrService.success(this.translate.instant('SEE_YOU_SOON'), '', {timeOut: 1000});
    this.router.navigate(['/login']);
  }


}

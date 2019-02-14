 import {Component, OnInit} from '@angular/core';
import {OAuthService} from '../../core/services/security/oauth.service';
import {UtilsService} from '../../main/services/utils.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {User} from '../../main/models/user.model';
import {environment} from '../../../environments/environment';
import {AuthHelper} from '../../core/services/security/auth.helper';
import {HomeService} from '../../main/services/home.service';
 import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
    public user: User;
    public applogo: string;
    public href: string = '';
    alerts: Array<any> = [];

    constructor(private oauthService: OAuthService,
                private utilsService: UtilsService,
                private homeService: HomeService,
                private toastrService: ToastrService,
                private translate: TranslateService,
                private router: Router) {
    }

    ngOnInit() {
        this.applogo = environment.appLogo;
        if (localStorage.getItem(AuthHelper.USER_ID)) {
            this.user = JSON.parse(localStorage.getItem(AuthHelper.USER_ID));
            this.user.avatar = this.user.avatar || environment.defaultAvatar;
        }
        this.href = this.router.url;
        this.href = this.href.substr(1, this.href.length - 1);
        if (this.user && this.user.id && this.href !== 'admin') {
           // this.getNotifications();
        }
    }

    getNotifications() {
        this.homeService.getAlertsNotification(0, 10).subscribe(response => {
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
        this.toastrService.success(this.translate.instant('SEE_YOU_SOON'), '', {timeOut: 1000});
        this.router.navigate(['/login']);
    }
}

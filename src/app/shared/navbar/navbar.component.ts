import {Component, OnInit} from '@angular/core';
import {OAuthService} from '../../core/services/security/oauth.service';
import {UtilsService} from '../../main/services/utils.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {User} from '../../main/models/user.model';
import {environment} from '../../../environments/environment';
import {AuthHelper} from '../../core/services/security/auth.helper';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
    public user: User;
    public applogo: string;
    alerts: Array<any> = [];

    constructor(private oauthService: OAuthService,
                private utilsService: UtilsService,
                private toastrService: ToastrService,
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
        this.toastrService.success('À bientôt', '', {timeOut: 1000});
        this.router.navigate(['/login']);
    }
}

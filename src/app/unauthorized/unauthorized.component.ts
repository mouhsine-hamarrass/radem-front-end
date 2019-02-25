import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {OAuthService} from '../core/services/security/oauth.service';
import {HostListener} from '@angular/core';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss']
})
@HostListener('window:popstate', ['$event'])

export class UnauthorizedComponent implements OnInit {

  constructor(private router: Router,
              private oauthService: OAuthService) {
  }

  ngOnInit() {
  }

  refresh(event): void {
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 500);
  }

  public logout() {
    this.oauthService.logout();
    this.router.navigate(['/login']);
  }

}

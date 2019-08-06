import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {Router} from '@angular/router';
import {OAuthService} from '../core/services/security/oauth.service';
import {HostListener} from '@angular/core';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss']
})

export class UnauthorizedComponent implements OnInit {

  constructor(private router: Router,
              private renderer: Renderer2,
              private oauthService: OAuthService) {
  }

  ngOnInit() {
    this.renderer.setStyle(document.body, 'margin-left', '30px');
    this.renderer.setStyle(document.body, 'margin-right', '30px');
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

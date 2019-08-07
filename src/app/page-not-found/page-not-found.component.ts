import {Component, ElementRef, Inject, OnInit, Renderer2} from '@angular/core';
import {LoggerService} from '../core/services/logging/logger.service';
import {AuthHelper} from '../core/services/security/auth.helper';
import {User} from '../main/models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  user: User;

  constructor(private renderer: Renderer2,
              private router: Router,
              @Inject('LoggerService') private loggerService: LoggerService) {
  }

  ngOnInit() {
    this.renderer.setStyle(document.body, 'margin-left', '30px');
    this.renderer.setStyle(document.body, 'margin-right', '30px');
    this.loggerService.log('... initializing page not found component from shared module.');
    this.user = JSON.parse(localStorage.getItem(AuthHelper.USER_ID));
  }

  goToHome(): void {
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 500);
  }
}

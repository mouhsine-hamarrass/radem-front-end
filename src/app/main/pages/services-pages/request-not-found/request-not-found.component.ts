import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../models/user.model';
import {AuthHelper} from '../../../../core/services/security/auth.helper';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-request-not-found',
  templateUrl: './request-not-found.component.html',
  styleUrls: ['./request-not-found.component.scss']
})
export class RequestNotFoundComponent implements OnInit {

  typePath: string;
  type: string;

  private user: User;

  constructor(private renderer: Renderer2,
              private router: Router,
              private translate: TranslateService,
              private route: ActivatedRoute) {
    this.user = JSON.parse(localStorage.getItem(AuthHelper.USER_ID));
  }

  ngOnInit() {
    this.typePath = this.route.snapshot.paramMap.get('type');
    switch (this.typePath) {
      case 'subscription-requests':
        this.type = this.translate.instant('SUBSCRIPTION');
        break;
      case 'cancellation-requests':
        this.type = this.translate.instant('CANCELLATION');
        break;
      case 'embranchement-requests':
        this.type = this.translate.instant('EMBRANCHEMENT');
        break;
      case 'refund-requests':
        this.type = this.translate.instant('REFUND');
        break;
      default:
        this.type = '';
    }
    this.renderer.setStyle(document.body, 'margin-left', '30px');
    this.renderer.setStyle(document.body, 'margin-right', '30px');
  }

  goToRequests(): void {

    if (!this.typePath) {
      this.router.navigate(['/home']);
    }
    setTimeout(() => {
      switch (this.typePath) {
        case 'subscription-requests':
          this.router.navigate(['/services/subscription-requests']);
          break;
        case 'cancellation-requests':
          this.router.navigate(['/services/cancellation-requests']);
          break;
        case 'embranchement-requests':
          this.router.navigate(['/services/embranchement-requests']);
          break;
        case 'refund-requests':
          this.router.navigate(['/services/refund-requests']);
          break;
        default:
          this.router.navigate(['/home']);
      }
      this.router.navigate(['/services/refund-requests']);
    }, 500);
  }
}

import {Component, ElementRef, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {User} from '../../main/models/user.model';
import {AuthHelper} from '../../core/services/security/auth.helper';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit, OnDestroy {

  user: User;

  constructor(private renderer: Renderer2, private elRef: ElementRef) {
    this.renderer.setStyle(document.body, 'margin-left', '30px');
    this.renderer.setStyle(document.body, 'margin-right', '30px');
    this.user = JSON.parse(localStorage.getItem(AuthHelper.USER_ID));

  }

  ngOnInit() {
    this.renderer.setStyle(document.body, 'margin-left', '30px');
    this.renderer.setStyle(document.body, 'margin-right', '30px');
  }

  ngOnDestroy() {
    this.renderer.removeStyle(document.body, 'margin-left');
    this.renderer.removeStyle(document.body, 'margin-right');
  }
}

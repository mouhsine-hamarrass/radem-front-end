import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {Router} from '@angular/router';
import {AuthHelper} from '../core/services/security/auth.helper';
import {User} from '../main/models/user.model';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent implements OnInit {

  private user: User;

  constructor(private renderer: Renderer2,
              private router: Router) {
    this.user = JSON.parse(localStorage.getItem(AuthHelper.USER_ID));
  }

  ngOnInit() {
    this.renderer.setStyle(document.body, 'margin-left', '30px');
    this.renderer.setStyle(document.body, 'margin-right', '30px');
  }

  refresh(): void {
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 500);
  }
}

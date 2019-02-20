import {Component, OnInit} from '@angular/core';
import {ROUTES} from './sidebar-routes.config';
import {Router, ActivatedRoute} from '@angular/router';
import {User} from '../../main/models/user.model';
import {AuthHelper} from '../../core/services/security/auth.helper';
import {environment} from '../../../environments/environment';
import * as _ from 'underscore';

declare var $: any;

@Component({
  // moduleId: module.id,
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
  public user: User;
  public menuItems: any[];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    $.getScript('./assets/app/js/core/app-menu.js');
    $.getScript('./assets/app/js/core/app.js');

    if (localStorage.getItem(AuthHelper.USER_ID)) {
      this.user = JSON.parse(localStorage.getItem(AuthHelper.USER_ID));
    }
    const withoutMenus = ['admin-alerts', 'settings', 'requests', 'services', 'complaints', 'alerts'];
    const menuTrim = [];

    this.menuItems = ROUTES.filter(menuItem => menuItem);

    if (!this.user.requestsFollow) {
      _.find(this.menuItems, (menu) => {
        if (withoutMenus.includes(menu.id)) {
          menuTrim.push(menu)
        }
      });
      this.menuItems = _.difference(this.menuItems, menuTrim);
    }
  }

}

import {Component, OnInit} from '@angular/core';
import {ROUTES} from './second-navbar-routes.config';
import {ActivatedRoute, Router} from '@angular/router';

declare var $: any;


@Component({
  selector: 'app-second-navbar',
  templateUrl: './second-navbar.component.html',
  styleUrls: ['./second-navbar.component.scss']
})
export class SecondNavbarComponent implements OnInit {
  public menuItems: any[];

  constructor(private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    $.getScript('./assets/app/js/core/app-menu.js');
    $.getScript('./assets/app/js/core/app.js');

    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
}

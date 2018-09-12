import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {
  protected alerts: any;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getAlertsNotifications().subscribe(response => {
      this.alerts = response.data;
      console.log(this.alerts);
    })
  }

}

import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../../services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  alertsCount: number;
  requestsCount: number;
  complaintsCount: number;

  constructor(private adminService: AdminService) {
  }

  ngOnInit() {
    this.adminService.getAlertsCount().subscribe(response => {
      this.alertsCount = response.data;
    });

    this.adminService.getRequestsCount().subscribe(response => {
      this.requestsCount = response.data;
    });

    this.adminService.getComplaintsCount().subscribe(response => {
      this.complaintsCount = response.data;
    });
  }

}

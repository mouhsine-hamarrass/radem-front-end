import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../../services/admin.service';

declare let L;
const portailUrl = 'https://portailsig.radem.ma/server/rest/services/Gestion_Reclamation_clients/FeatureServer/0';

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
    this.getTotalCount().then((count: number) => {
      this.complaintsCount = count;
    });
  }

  getTotalCount() {
    return new Promise(function (resolve, reject) {
      const query = L.esri.query({
        url: portailUrl
      });
      query.where('1=1');
      query.count(function (error, count, response) {
        if (error) {
          reject(error);
        } else {
          resolve(count);
        }
      });
    })
  }
}

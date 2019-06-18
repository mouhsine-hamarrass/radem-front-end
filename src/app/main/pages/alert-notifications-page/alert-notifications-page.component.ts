import {Component, OnInit} from '@angular/core';
import {AlertNotificationModel} from '../../models/alert-notification.model';
import {AdminService} from '../../services/admin.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-alert-notifications-page',
  templateUrl: './alert-notifications-page.component.html',
  styleUrls: ['./alert-notifications-page.component.scss']
})
export class AlertNotificationsPageComponent implements OnInit {

  alertNotifications: any = Array<AlertNotificationModel>();
  page = 1;
  pageSize = 0;
  totalElements: number;
  totalPages: number;
  numberOfItems: number;
  itemsPerPage: number;
  sort: any;
  filter: any;

  constructor(private adminService: AdminService,
              private toastrService: ToastrService) {
  }

  ngOnInit() {
    this.getAlertNotifications();
  }

  onSorted(sort: any): void {
    this.sort = sort;
    this.getAlertNotifications();
  }

  onFiltred(filter: any): void {
    this.filter = filter;
    this.getAlertNotifications();
  }

  getAlertNotifications() {
    debugger;
    this.adminService.getPageableAlertNotifications(this.page, this.pageSize, this.filter, this.sort)
      .subscribe(response => {
        this.alertNotifications = response.data.content;
        this.totalElements = response.data.totalElements;
        this.totalPages = response.data.totalPages;
        this.itemsPerPage = response.data.size;
        this.numberOfItems = response.data.numberOfElements;
      }, err => {
      });
  }

  pageChanged(page: number): void {
    this.page = page;
    this.getAlertNotifications();
  }

  pageFilter(pageSize: number): void {
    this.pageSize = pageSize;
    this.itemsPerPage = pageSize;
    this.page = 1;
    this.getAlertNotifications();
  }

}

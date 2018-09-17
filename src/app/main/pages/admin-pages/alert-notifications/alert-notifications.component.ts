import { Component, OnInit } from '@angular/core';
import {AlertModel} from '../../../models/alert.model';
import {AdminService} from '../../../services/admin.service';
import {BsModalRef} from 'ngx-bootstrap';
import {AlertNotificationModel} from '../../../models/alert-notification.model';
import swal from 'sweetalert2';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-alert-notifications',
  templateUrl: './alert-notifications.component.html',
  styleUrls: ['./alert-notifications.component.scss']
})
export class AlertNotificationsComponent implements OnInit {

  alertNotifications: any = Array<AlertNotificationModel>();
  page = 1;
  pageSize = 5;
  numberOfItems: number;
  itemsPerPage: number;
  totalElements: number;
  totalPages: number;
  keyword: string;

  constructor(private adminService: AdminService,
              private toastrService: ToastrService) {
  }

  ngOnInit() {
    this.getAlertNotifications();
  }

  getAlertNotifications() {
    this.adminService.getPageableAlertNotifications(this.page, this.pageSize, this.keyword).subscribe(response => {
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
    this.adminService.getPageableAlertNotifications(this.page, this.pageSize, this.keyword).subscribe(response => {
      this.alertNotifications = response.data.content;
      this.totalElements = response.data.totalElements;
      this.totalPages = response.data.totalPages;
      this.itemsPerPage = response.data.size;
      this.numberOfItems = response.data.numberOfElements;
    }, err => {
    });
  }

  searchAlerts(keyword: string): void {
    this.page = 1;
    this.keyword = keyword;
    this.adminService.getPageableAlertNotifications(this.page, this.pageSize, this.keyword).subscribe(response => {
      this.alertNotifications = response.data.content;
      this.totalElements = response.data.totalElements;
      this.totalPages = response.data.totalPages;
      this.itemsPerPage = response.data.size;
      this.numberOfItems = response.data.numberOfElements;
    }, err => {
    });
  }

  filterAlerts(pageSize: number): void {
    this.pageSize = pageSize;
    this.page = 1;
    this.adminService.getPageableAlertNotifications(this.page, this.pageSize, this.keyword).subscribe(response => {
      this.alertNotifications = response.data.content;
      this.totalElements = response.data.totalElements;
      this.totalPages = response.data.totalPages;
      this.itemsPerPage = response.data.size;
      this.numberOfItems = response.data.numberOfElements;
    }, err => {
    });
  }

  dropAlertNotification(alertNotificationId: number) {
    swal({
      title: 'Etes-vous sûr de vouloir continuer',
      text: 'Cette action est irréversible',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, Je suis sûr!'
    }).then((result) => {
      if (result.value) {
        this.adminService.dropAlertNotification(alertNotificationId).subscribe((response) => {
          if (response.status === 'OK') {
            this.toastrService.success('Opération réussite', '');
            this.getAlertNotifications();
          }
        }, (err) => {
        });
      }
    });
  }
}

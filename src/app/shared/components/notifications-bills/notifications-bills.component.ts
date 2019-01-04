import {Component, OnInit} from '@angular/core';
import {HomeService} from '../../../main/services/home.service';
import {AlertNotificationModel} from '../../../main/models/alert-notification.model';

@Component({
    selector: 'app-notifications-bills',
    templateUrl: './notifications-bills.component.html',
    styleUrls: ['./notifications-bills.component.scss']
})
export class NotificationsBillsComponent implements OnInit {

    alerts: Array<AlertNotificationModel> = [];

    constructor(private homeService: HomeService) {
    }

    ngOnInit() {
        this.getNotifications();
    }

    getNotifications() {
        this.homeService.getAlertsNotification().subscribe(response => {
            this.alerts = response.data;
        }, err => {
        });
    }

}

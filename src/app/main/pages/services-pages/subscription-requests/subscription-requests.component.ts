import {Component, OnInit} from '@angular/core';
import {ServicesService} from '../../../services/services.service';
import {Statut} from '../../../../shared/models/user.model';
import * as _ from 'underscore';

@Component({
    selector: 'app-subscription-requests',
    templateUrl: './subscription-requests.component.html',
    styleUrls: ['./subscription-requests.component.scss']
})
export class SubscriptionRequestsComponent implements OnInit {

    subscriptionRequests: Array<any>;
    page = 1;
    pageSize = 0;
    totalElements: number;
    totalPages: number;
    numberOfItems: number;
    itemsPerPage: number;
    sort: any;
    filter: any;
    statusFilter = Object.keys(Statut);

    constructor(private myServices: ServicesService) {
    }

    ngOnInit() {
        this.getSubscriptions();
        this.statusFilterable();
    }

    onSorted(sort: any): void {
        this.sort = sort;
        this.getSubscriptions();
    }

    onFiltred(filter: any): void {
        this.filter = filter;
        this.getSubscriptions();
    }

    getSubscriptions(): void {
        this.myServices.getSubscriptionRequests(this.page, this.pageSize)
            .subscribe(response => {
                this.subscriptionRequests = response.data.content;
                this.totalElements = response.data.totalElements;
                this.totalPages = response.data.totalPages;
                this.itemsPerPage = response.data.size;
                this.numberOfItems = response.data.numberOfElements;
            }, err => {
            });
    }

    pageChanged(page: number): void {
        this.page = page;
        this.getSubscriptions();
    }

    pageFilter(pageSize: number): void {
        this.pageSize = pageSize;
        this.itemsPerPage = pageSize;
        this.page = 1;
        this.getSubscriptions();
    }

    statusFilterable(): void {
        this.statusFilter = _.difference(this.statusFilter, _.without(this.statusFilter,
            'FILING_APPLICATION', 'INTERVENTION', 'METER_POSES', 'SUBSCRIPTION_INVOICE', 'SUBSCRIBED'));
    }

}

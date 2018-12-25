import {Component, OnInit} from '@angular/core';
import {ServicesService} from '../../../services/services.service';

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
    keyword: string;
    sort: any;
    filter: any;

    constructor(private myServices: ServicesService) {
    }

    ngOnInit() {
        this.getSubscriptions();
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
        this.myServices.getSubscriptionRequests(this.page, this.pageSize, this.keyword, this.filter, this.sort)
            .subscribe(response => {
                this.subscriptionRequests = response.data;
                console.log(this.subscriptionRequests);
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

}

import {Component, OnInit} from '@angular/core';
import {ServicesService} from '../../../services/services.service';

@Component({
    selector: 'app-claim-requests',
    templateUrl: './claim-requests.component.html',
    styleUrls: ['./claim-requests.component.scss']
})
export class ClaimRequestsComponent implements OnInit {
    complaints: any;
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
        this.getClaimRequests();
    }

    onSorted(sort: any): void {
        this.sort = sort;
        this.getClaimRequests();
    }

    onFiltred(filter: any): void {
        this.filter = filter;
        this.getClaimRequests();
    }

    getClaimRequests() {
        this.myServices.getPageableComplaints(this.page, this.pageSize, this.keyword, this.filter, this.sort)
            .subscribe(response => {
                this.complaints = response.data.content;
                this.totalElements = response.data.totalElements;
                this.totalPages = response.data.totalPages;
                this.itemsPerPage = response.data.size;
                this.numberOfItems = response.data.numberOfElements;
            }, err => {
            });
    }

    pageChanged(page: number): void {
        this.page = page;
        this.getClaimRequests();
    }

    pageFilter(pageSize: number): void {
        this.pageSize = pageSize;
        this.itemsPerPage = pageSize;
        this.page = 1;
        this.getClaimRequests();
    }
}

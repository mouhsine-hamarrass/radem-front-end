import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ServicesService} from '../../../services/services.service';

@Component({
    selector: 'app-cancellation-requests',
    templateUrl: './cancellation-requests.component.html',
    styleUrls: ['./cancellation-requests.component.scss']
})
export class CancellationRequestsComponent implements OnInit {

    cancellationRequests: Array<any> = [];
    page = 1;
    pageSize = 5;
    numberOfItems: number;
    itemsPerPage: number;
    totalElements: number;
    totalPages: number;
    keyword: string;

    constructor(
        private myServices: ServicesService
    ) {
    }

    ngOnInit() {
        this.getTerminationRequests();
    }

    getTerminationRequests() {
        this.myServices.getPageableTerminationRequests(this.page, this.pageSize, this.keyword).subscribe(response => {
            this.cancellationRequests = response.data.content;
            this.totalElements = response.data.totalElements;
            this.totalPages = response.data.totalPages;
            this.itemsPerPage = response.data.size;
            this.numberOfItems = response.data.numberOfElements;
        }, err => {
        });
    }

    pageChanged(page: number): void {
        this.page = page;
        this.myServices.getPageableTerminationRequests(this.page, this.pageSize, this.keyword).subscribe(response => {
            this.cancellationRequests = response.data.content;
            this.totalElements = response.data.totalElements;
            this.totalPages = response.data.totalPages;
            this.itemsPerPage = response.data.size;
            this.numberOfItems = response.data.numberOfElements;
        }, err => {
        });
    }

    searchClaimRequests(keyword: string): void {
        this.page = 1;
        this.keyword = keyword;
        this.myServices.getPageableTerminationRequests(this.page, this.pageSize, this.keyword).subscribe(response => {
            this.cancellationRequests = response.data.content;
            this.totalElements = response.data.totalElements;
            this.totalPages = response.data.totalPages;
            this.itemsPerPage = response.data.size;
            this.numberOfItems = response.data.numberOfElements;
        }, err => {
        });
    }

    filterClaimRequests(pageSize: number): void {
        this.pageSize = pageSize;
        this.page = 1;
        this.myServices.getPageableTerminationRequests(this.page, this.pageSize, this.keyword).subscribe(response => {
            this.cancellationRequests = response.data.content;
            this.totalElements = response.data.totalElements;
            this.totalPages = response.data.totalPages;
            this.itemsPerPage = response.data.size;
            this.numberOfItems = response.data.numberOfElements;
        }, err => {
        });
    }
}

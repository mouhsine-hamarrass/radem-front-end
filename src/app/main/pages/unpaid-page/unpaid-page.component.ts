import {Component, OnInit} from '@angular/core';
import {ContractsService} from '../../services/contracts.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-unpaid',
    templateUrl: './unpaid-page.component.html',
    styleUrls: ['./unpaid-page.component.scss']
})
export class UnpaidPageComponent implements OnInit {
    bills;
    selectedBills = [];
    total;
    totalUnpaid;
    confirmation = false;

    page = 1;
    pageSize = 0;
    totalElements: number;
    totalPages: number;
    numberOfItems: number;
    itemsPerPage: number;
    keyword: string;
    sort: any;
    filter: any;

    constructor(
        private contractServices: ContractsService,
        private router: Router) {
    }

    ngOnInit() {
        this.getAllBills();
    }

    onSorted(sort: any): void {
        this.sort = sort;
        this.getAllBills();
    }

    onFiltred(filter: any): void {
        this.filter = filter;
        this.getAllBills();
    }

    getAllBills() {
        this.total = 0;
        this.totalUnpaid = 0;
        this.contractServices.getPageableBills(this.page, this.pageSize, this.keyword, this.filter, this.sort)
            .subscribe(response => {
                this.bills = response.data;
                this.bills.forEach(bill => {
                    this.totalUnpaid += Number.parseInt(bill.amount);
                });
                this.totalElements = response.data.totalElements;
                this.totalPages = response.data.totalPages;
                this.itemsPerPage = response.data.size;
                this.numberOfItems = response.data.numberOfElements;
            }, err => {
            });
    }

    pageChanged(page: number): void {
        this.page = page;
        this.getAllBills();
    }

    pageFilter(pageSize: number): void {
        this.pageSize = pageSize;
        this.itemsPerPage = pageSize;
        this.page = 1;
        this.getAllBills();
    }

    addBill(event, bill: any): void {
        if (event.target.checked) {
            this.total += Number.parseInt(bill.amount);
            this.selectedBills.push(bill);
        } else {
            this.total -= Number.parseInt(bill.amount);
            this.selectedBills.splice(this.selectedBills.indexOf(bill), 1);
        }
    }

    selectAll(event): void {
        if (event.target.checked) {
            this.total = this.totalUnpaid;
            // this.selectedBills = this.bills;
        } else {
            this.total = 0;
            // this.selectedBills = [];
        }
    }

    submit() {
        if (this.selectedBills.length !== 0) {
            this.confirmation = true;
        }
    }

    cancel() {
        this.confirmation = false;
        this.total = 0;
        this.selectedBills = [];
    }

}

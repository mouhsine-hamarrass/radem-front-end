import {Component, OnInit} from '@angular/core';
import {ContractsService} from '../../../services/contracts.service';

@Component({
  selector: 'app-unpaid-table',
  templateUrl: './unpaid-table.component.html',
  styleUrls: ['./unpaid-table.component.scss']
})
export class UnpaidTableComponent implements OnInit {
  bills;
  total;
  totalUnpaid;

  page = 1;
  pageSize = 0;
  totalElements: number;
  totalPages: number;
  numberOfItems: number;
  itemsPerPage: number;
  sort: any;
  filter: any;

  constructor(private contractServices: ContractsService) {
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
    this.contractServices.getPageableBills(this.page, this.pageSize, this.filter, this.sort)
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

  selectAll(event) {

  }

}

import {Component, Input, OnInit} from '@angular/core';
import {ContractsService} from '../../../services/contracts.service';
import {User} from '../../../models/user.model';
import {AuthHelper} from '../../../../core/services/security/auth.helper';

@Component({
  selector: 'app-unpaid-table',
  templateUrl: './unpaid-table.component.html',
  styleUrls: ['./unpaid-table.component.scss']
})

export class UnpaidTableComponent implements OnInit {
  bills;
  selectedBills = [];
  total;
  totalUnpaid;
  confirmation = false;

  user: User;
  page = 1;
  pageSize = 0;
  totalElements: number;
  totalPages: number;
  numberOfItems: number;
  itemsPerPage: number;
  sort: any;
  filter: any;

  @Input() multiBillSelect = false;

  constructor(private contractServices: ContractsService) {
  }

  ngOnInit() {
    if (localStorage.getItem(AuthHelper.USER_ID)) {
      this.user = JSON.parse(localStorage.getItem(AuthHelper.USER_ID));
    }
    this.getAllUnpaidBills();
  }

  onSorted(sort: any): void {
    this.sort = sort;
    this.getAllUnpaidBills();
  }

  onFiltred(filter: any): void {
    this.filter = filter;
    this.getAllUnpaidBills();
  }

  getAllUnpaidBills() {
    this.total = 0;
    this.totalUnpaid = 0;
    /*
    * this.contractServices.getPageableUnpaidBills(this.page, this.pageSize)
      .subscribe(response => {
        this.bills = response.data.content;
        this.bills.forEach(bill => {
          this.totalUnpaid += Number.parseInt(bill.amount);
        });
        this.totalElements = response.data.totalElements;
        this.totalPages = response.data.totalPages;
        this.itemsPerPage = response.data.size;
        this.numberOfItems = response.data.numberOfElements;
        console.log(this.bills);
      }, err => {
      });
    * */
  }

  pageChanged(page: number): void {
    this.page = page;
    this.getAllUnpaidBills();
  }

  pageFilter(pageSize: number): void {
    this.pageSize = pageSize;
    this.itemsPerPage = pageSize;
    this.page = 1;
    this.getAllUnpaidBills();
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

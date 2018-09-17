import { Component, OnInit } from '@angular/core';
import { ContractsService } from '../../services/contracts.service';
import { ActivatedRoute, Router } from '../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-unpaid',
  templateUrl: './unpaid-page.component.html',
  styleUrls: ['./unpaid-page.component.scss']
})
export class UnpaidPageComponent implements OnInit {
  protected bills;
  protected selectedBills = [];
  protected total;
  protected totalUnpaid;
  protected confirmation = false;

  constructor(private contractServices: ContractsService, private router: Router) { }

  ngOnInit() {
    this.total = 0;
    this.totalUnpaid = 0;
    this.contractServices.getAllBills().subscribe(Response => {
      this.bills = Response;
      this.bills.forEach(bill => {
        this.totalUnpaid += Number.parseInt(bill.amount);
      });
      console.log(this.bills);
    }, err => {});
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

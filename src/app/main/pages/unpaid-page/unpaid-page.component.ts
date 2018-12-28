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

    constructor(
        private contractServices: ContractsService,
        private router: Router) {
    }

    ngOnInit() {

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

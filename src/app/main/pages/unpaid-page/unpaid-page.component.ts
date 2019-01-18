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

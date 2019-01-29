import {Component, OnInit} from '@angular/core';
import {ContractsService} from '../../services/contracts.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminService} from '../../services/admin.service';
import {AuthHelper} from '../../../core/services/security/auth.helper';
import {User} from '../../models/user.model';
import {ContractModel} from '../../models/contract.model';

@Component({
    selector: 'app-unpaid',
    templateUrl: './unpaid-page.component.html',
    styleUrls: ['./unpaid-page.component.scss']
})
export class UnpaidPageComponent implements OnInit {
    public user: User;
    userContracts: Array<ContractModel>;
    selectedBills = [];
    dropdownSettings: any = {};

    total;
    totalUnpaid;
    confirmation = false;

    constructor(
        private contractServices: ContractsService,
        private adminService: AdminService,
        private router: Router) {
    }

    ngOnInit() {
        if (localStorage.getItem(AuthHelper.USER_ID)) {
            this.user = JSON.parse(localStorage.getItem(AuthHelper.USER_ID));
        }
    }

    getClientContracts() {
        this.adminService.getAllContractByNumClient().subscribe(response => {
            this.userContracts = response.data;
        });
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

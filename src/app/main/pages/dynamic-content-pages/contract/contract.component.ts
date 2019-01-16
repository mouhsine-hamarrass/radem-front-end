import {Component, OnInit} from '@angular/core';
import {DynamicModel} from '../../../models/dynamic.model';
import {AdminService} from '../../../services/admin.service';

@Component({
    selector: 'app-contract',
    templateUrl: './contract.component.html',
    styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {

    dynamic: DynamicModel = {};

    constructor(private adminServices: AdminService) {
    }

    ngOnInit() {
        this.adminServices.getDynamicContent('mes_cntr').subscribe(
            response => {
                this.dynamic = response.data;
            },
            err => {
                console.log(err);
            }
        );
    }

}

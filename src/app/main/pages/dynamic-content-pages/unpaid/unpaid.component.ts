import {Component, OnInit} from '@angular/core';
import {DynamicModel} from '../../../models/dynamic.model';
import {AdminService} from '../../../services/admin.service';

@Component({
    selector: 'app-unpaid',
    templateUrl: './unpaid.component.html',
    styleUrls: ['./unpaid.component.scss']
})
export class UnpaidComponent implements OnInit {

    dynamic: DynamicModel = {};

    constructor(private adminServices: AdminService) {
    }

    ngOnInit() {
        this.adminServices.getDynamicContent('').subscribe(
            response => {
                this.dynamic = response.data;
            },
            err => {
                console.log(err);
            }
        );
    }

}

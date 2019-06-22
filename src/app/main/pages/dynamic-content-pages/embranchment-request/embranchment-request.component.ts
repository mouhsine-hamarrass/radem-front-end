import {Component, OnInit} from '@angular/core';
import {DynamicModel} from '../../../models/dynamic.model';
import {AdminService} from '../../../services/admin.service';

@Component({
    selector: 'app-unpaid',
    templateUrl: './embranchment-request.component.html',
    styleUrls: ['./embranchment-request.component.scss']
})
export class EmbranchmentRequestComponent implements OnInit {

    dynamic: DynamicModel;

    constructor(private adminServices: AdminService) {
    }

    ngOnInit() {
        this.adminServices.getDynamicContent('dem_bran').subscribe(
            response => {
                this.dynamic = response.data;
            },
            err => {
                console.log(err);
            }
        );
    }

}

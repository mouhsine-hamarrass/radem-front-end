import {Component, OnInit} from '@angular/core';
import {DynamicModel} from '../../../models/dynamic.model';
import {AdminService} from '../../../services/admin.service';

@Component({
    selector: 'app-subscription-request',
    templateUrl: './subscription-request.component.html',
    styleUrls: ['./subscription-request.component.scss']
})
export class SubscriptionRequestComponent implements OnInit {

    dynamic: DynamicModel = {};

    constructor(private adminServices: AdminService) {
    }

    ngOnInit() {
        this.adminServices.getDynamicContent('dem_abt').subscribe(
            response => {
                this.dynamic = response.data;
            },
            err => {
                console.log(err);
            }
        );
    }

}

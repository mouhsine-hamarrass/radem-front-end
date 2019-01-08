import {Component, OnInit} from '@angular/core';
import {DynamicModel} from '../../../models/dynamic.model';
import {AdminService} from '../../../services/admin.service';

@Component({
    selector: 'app-claim-request',
    templateUrl: './claim-request.component.html',
    styleUrls: ['./claim-request.component.scss']
})
export class ClaimRequestComponent implements OnInit {

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

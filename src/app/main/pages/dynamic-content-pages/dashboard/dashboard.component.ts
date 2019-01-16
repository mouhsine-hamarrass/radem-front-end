import {Component, OnInit} from '@angular/core';
import {DynamicModel} from '../../../models/dynamic.model';
import {AdminService} from '../../../services/admin.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    dynamic: DynamicModel;

    constructor(private adminServices: AdminService) {
    }

    ngOnInit() {
        this.adminServices.getDynamicContent('table_bord').subscribe(
            response => {
                this.dynamic = response.data;
            },
            err => {
                console.log(err);
            }
        );
    }

}

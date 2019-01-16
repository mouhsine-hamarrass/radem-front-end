import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../../services/admin.service';
import {DynamicModel} from '../../../models/dynamic.model';

@Component({
    selector: 'app-auto-report',
    templateUrl: './auto-report.component.html',
    styleUrls: ['./auto-report.component.scss']
})
export class AutoReportComponent implements OnInit {

    dynamic: DynamicModel;

    constructor(private adminServices: AdminService) {
    }

    ngOnInit() {
        this.adminServices.getDynamicContent('auto_releve').subscribe(
            response => {
                this.dynamic = response.data;
            },
            err => {
                console.log(err);
            }
        );
    }

}

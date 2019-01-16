import {Component, OnInit} from '@angular/core';
import {DynamicModel} from '../../../models/dynamic.model';
import {AdminService} from '../../../services/admin.service';

@Component({
    selector: 'app-regulation',
    templateUrl: './regulation.component.html',
    styleUrls: ['./regulation.component.scss']
})
export class RegulationComponent implements OnInit {

    dynamic: DynamicModel;

    constructor(private adminServices: AdminService) {
    }

    ngOnInit() {
        this.adminServices.getDynamicContent('mes_reg').subscribe(
            response => {
                this.dynamic = response.data;
            },
            err => {
                console.log(err);
            }
        );
    }

}

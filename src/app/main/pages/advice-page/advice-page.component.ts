import {Component, OnInit} from '@angular/core';
import {Setting} from '../../models/setting.model';
import {AdminService} from '../../services/admin.service';

@Component({
    selector: 'app-advice-page',
    templateUrl: './advice-page.component.html',
    styleUrls: ['./advice-page.component.scss']
})
export class AdvicePageComponent implements OnInit {

    advices: Setting;

    constructor(private adminServices: AdminService) {
    }

    ngOnInit() {
        this.adminServices.getAdvices().subscribe(
            response => {
                this.advices = response.data;
            },
            err => {
                console.log(err);
            }
        );
    }

}

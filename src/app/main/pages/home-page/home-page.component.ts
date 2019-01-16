import {Component, OnInit} from '@angular/core';
import {ContractsService} from '../../services/contracts.service';
import {HomeService} from '../../services/home.service';
import {AdminService} from '../../services/admin.service';
import {ProfileService} from '../../services/profile.service';

import {TranslateService} from '@ngx-translate/core';


@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

    constructor(
        private contractServices: ContractsService,
        private adminServices: AdminService,
        private profileService: ProfileService,
        private homeService: HomeService,
        private translate: TranslateService) {

    }


    ngOnInit() {


    }

}

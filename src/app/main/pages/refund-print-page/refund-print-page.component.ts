import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HelperService} from '../../services/helper.service';
import {Subscription} from 'rxjs/Subscription';


@Component({
    selector: 'app-refund-print-page',
    templateUrl: './refund-print-page.component.html',
    styleUrls: ['./refund-print-page.component.scss']
})
export class RefundPrintPageComponent implements OnInit {
    public info: any;
    public date = new Date();
    private infoSubscrip: Subscription;

    constructor(private router: Router, private helper: HelperService) {
        if (!this.helper.getInfo()) {
            this.router.navigate(['/refund-request-page']);
        } else {
            this.info = this.helper.getInfo();
         }


    }

    ngOnInit() {/*debugger;
        this.infoSubscrip = this.helper.getInfos().subscribe(data => {
            this.info = data;
        });*/
    }

}

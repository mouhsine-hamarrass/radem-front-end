import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {HelperService} from '../../services/helper.service';
import {PrintService} from '../../../shared/services/print.service';


@Component({
    selector: 'app-refund-print-page',
    templateUrl: './refund-print-page.component.html',
    styleUrls: ['./refund-print-page.component.scss']
})
export class RefundPrintPageComponent implements OnInit {
    public info: any;
    public date = new Date();

    constructor(private router: Router, private helper: HelperService) {
        if (!this.helper.getInfo()) {
            this.router.navigate(['/service-approach/refund-request-page']);
        } else {
            this.info = this.helper.getInfo();
        }
    }

    ngOnInit() {
    }

    ngAfterViewInit() {debugger
        if (!this.helper.getInfo()) {
            this.router.navigate(['/service-approach/refund-request-page']);
        } else {
            window.print();
        }
    }


}

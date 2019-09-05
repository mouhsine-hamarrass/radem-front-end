import {Component, OnInit} from '@angular/core';
import {HelperService} from '../../services/helper.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-tax-print-page',
    templateUrl: './tax-print-page.component.html',
    styleUrls: ['./tax-print-page.component.scss']
})
export class TaxPrintPageComponent implements OnInit {

    public info: any;
    public date = new Date();

    constructor(private router: Router, private helper: HelperService) {
        if (!this.helper.getInfo()) {
            this.router.navigate(['/service-approach/tax-page']);
        } else {
            this.info = this.helper.getInfo();
        }
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        if (!this.helper.getInfo()) {
            this.router.navigate(['/service-approach/tax-page']);
        } else {
            window.print();
        }
    }

}

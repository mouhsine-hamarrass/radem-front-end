import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HelperService} from '../../services/helper.service';

@Component({
    selector: 'app-counter-print-page',
    templateUrl: './counter-print-page.component.html',
    styleUrls: ['./counter-print-page.component.scss']
})
export class CounterPrintPageComponent implements OnInit {

    public info: any;

    constructor(private router: Router, private helper: HelperService) {
        if (!this.helper.getInfo()) {
            this.router.navigate(['/service-approach/provisional-counter']);
        } else {
            this.info = this.helper.getInfo();
        }
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        if (!this.helper.getInfo()) {
            this.router.navigate(['/service-approach/provisional-counter']);
        } else {
            window.print();
        }
    }

}

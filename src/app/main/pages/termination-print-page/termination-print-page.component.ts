import {Component, OnInit} from '@angular/core';
import {HelperService} from '../../services/helper.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-termination-print-page',
    templateUrl: './termination-print-page.component.html',
    styleUrls: ['./termination-print-page.component.scss']
})
export class TerminationPrintPageComponent implements OnInit {

    public info: any;
    public type: string;
    public date = new Date();

    constructor(private router: Router, private helper: HelperService) {
        if (!this.helper.getInfo()) {
            this.router.navigate(['/service-approach/termination-page']);
        } else {
            this.info = this.helper.getInfo();
        }
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        if (!this.helper.getInfo()) {
            this.router.navigate(['/service-approach/termination-page']);
        } else {
            setTimeout(() => {
                window.print();
            }, 500);
        }
    }

}

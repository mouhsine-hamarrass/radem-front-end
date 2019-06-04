import {Component, OnInit} from '@angular/core';
import {ServicesService} from '../../../services/services.service';
import {RefundRequestModel} from '../../../models/refund-request.model';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-new-refund-detail',
    templateUrl: './new-refund-detail.component.html',
    styleUrls: ['./new-refund-detail.component.scss']
})
export class NewRefundDetailComponent implements OnInit {

    RefundDetails: RefundRequestModel;

    constructor(private services: ServicesService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.getRefundDetail();
    }

    getRefundDetail() {
        const requestNo: string = this.route.snapshot.paramMap.get('id');
        if (requestNo !== null) {
            this.services.getRefundDetails(requestNo).subscribe(response => {
                if (response && response.data) {
                    this.RefundDetails = response.data;
                }
            }, error => {
                console.log(error);
            })
        }
    }

}

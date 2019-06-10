import {Component, ElementRef, OnInit} from '@angular/core';
import {ServicesService} from '../../../services/services.service';
import {RefundRequestModel} from '../../../models/refund-request.model';
import {ActivatedRoute} from '@angular/router';
import * as JsPDF from 'jspdf';
import * as _ from 'underscore';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-new-refund-detail',
  templateUrl: './new-refund-detail.component.html',
  styleUrls: ['./new-refund-detail.component.scss']
})
export class NewRefundDetailComponent implements OnInit {

  refundRequest: RefundRequestModel;

  constructor(private services: ServicesService,
              private route: ActivatedRoute,
              private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.getRefundDetail();
  }

  public generatePDF() {

    const doc = new JsPDF('p', 'px', 'a4');
   
    const source = window.document.getElementById('toPrint');

    const options = {
      pagesplit: true
    };
    doc.fromHTML(source, 10, 10, options, () => {
      doc.save(this.refundRequest.requestNo + '.pdf');
    });
  }

  getRefundDetail() {
    const requestNo: string = this.route.snapshot.paramMap.get('requestNo');
    if (requestNo !== null) {
      this.services.getRefundDetails(requestNo).subscribe(response => {
        if (response && response.data) {
          this.refundRequest = response.data;
        } else {
          // request not found
        }
      }, error => {
        console.log(error);
      })
    }
  }

}

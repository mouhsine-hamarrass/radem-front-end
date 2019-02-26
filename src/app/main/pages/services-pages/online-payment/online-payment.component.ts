import {Component, OnInit} from '@angular/core';
import {DataService} from '../../../../shared/services/data.service';

@Component({
  selector: 'app-online-payment',
  templateUrl: './online-payment.component.html',
  styleUrls: ['./online-payment.component.scss']
})
export class OnlinePaymentComponent implements OnInit {

  selectedBills;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.getBillsToPay();
  }

  getBillsToPay() {
    this.selectedBills = this.dataService.get('selectedBills');
  }

}

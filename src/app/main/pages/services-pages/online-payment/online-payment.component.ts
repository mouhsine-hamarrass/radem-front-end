import {AfterViewInit, Component, OnInit} from '@angular/core';
import {DataService} from '../../../../shared/services/data.service';
import {environment} from '../../../../../environments/environment';
import {AuthHelper} from '../../../../core/services/security/auth.helper';
import {User} from '../../../models/user.model';
import {ServicesService} from '../../../services/services.service';
import {LightTransactionSummary} from '../../../models/lightTransactionSummary';

@Component({
  selector: 'app-online-payment',
  templateUrl: './online-payment.component.html',
  styleUrls: ['./online-payment.component.scss']
})
export class OnlinePaymentComponent implements OnInit {

  selectedBills;
  transactionSummary: LightTransactionSummary;
  user: User;
  sendDataUrl = environment.sendDataUrl;
  hash: string;

  constructor(private dataService: DataService, private services: ServicesService) {
  }

  ngOnInit() {

    if (localStorage.getItem(AuthHelper.USER_ID)) {
      this.user = JSON.parse(localStorage.getItem(AuthHelper.USER_ID));
    }

    this.getBillsToPay();

    this.services.getTransactionSammury(this.selectedBills.total).subscribe(response => {

      this.transactionSummary = response.data;

    }, err => {
      console.log(err)
    });
    console.log(this.selectedBills.invoices);
  }


  submit() {
    this.services
      .sendTransactionSummary(this.selectedBills.invoices)
      .subscribe(response => {
        this.ngOnInit();
      });

  }


  getBillsToPay() {
    this.selectedBills = this.dataService.get('selectedBills');
  }

}

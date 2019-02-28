import {Component, OnInit} from '@angular/core';
import {DataService} from '../../../../shared/services/data.service';
import {environment} from '../../../../../environments/environment';
import {AuthHelper} from '../../../../core/services/security/auth.helper';
import {User} from '../../../models/user.model';

@Component({
  selector: 'app-online-payment',
  templateUrl: './online-payment.component.html',
  styleUrls: ['./online-payment.component.scss']
})
export class OnlinePaymentComponent implements OnInit {

  selectedBills;
  user: User;
  shopUrl = environment.shopurl;
  sendDataUrl = environment.sendDataUrl;
  clientId = environment.clientId;
  failUrl = environment.failUrl;
  transactionType = environment.transactionType;
  callbackUrl = environment.callbackUrl;
  currency = environment.currency;
  okUrl = environment.okUrl;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {

    if (localStorage.getItem(AuthHelper.USER_ID)) {
      this.user = JSON.parse(localStorage.getItem(AuthHelper.USER_ID));
    }

    this.getBillsToPay();
  }


  getBillsToPay() {
    this.selectedBills = this.dataService.get('selectedBills');
  }

}

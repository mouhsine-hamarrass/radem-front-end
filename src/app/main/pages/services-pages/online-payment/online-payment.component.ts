import {AfterViewInit, Component, OnInit} from '@angular/core';
import {DataService} from '../../../../shared/services/data.service';
import {environment} from '../../../../../environments/environment';
import {AuthHelper} from '../../../../core/services/security/auth.helper';
import {User} from '../../../models/user.model';
import {ServicesService} from '../../../services/services.service';
import {LightTransactionSummary} from '../../../models/lightTransactionSummary';
import {InvoiceModel, TransactionSummaryModel} from '../../../models/transactionSummary.model';
import {SubscriptionReqModel} from '../../../models/subscriptionReq.model';
import {forEach} from '@angular/router/src/utils/collection';

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
  transactionSummaryModel: TransactionSummaryModel;
  invoicesModel: Array<InvoiceModel>;
  totalAmount: number;

  constructor(private dataService: DataService, private services: ServicesService) {
  }

  ngOnInit() {

    if (localStorage.getItem(AuthHelper.USER_ID)) {
      this.user = JSON.parse(localStorage.getItem(AuthHelper.USER_ID));
    }

    this.getBillsToPay();
    this.totalAmount = parseFloat(this.getTotalAmount());
    //this.totalAmount = this.totalAmount | number:'1.2-2'; // .toFixed(2);
    console.log(this.totalAmount);

    this.services.getTransactionSammury(this.totalAmount).subscribe(response => {

      this.transactionSummary = response.data;

      this.transactionSummaryModel = new TransactionSummaryModel(
        this.transactionSummary.oid,
        this.transactionSummary.amount,
        this.selectedBills.invoices)

    }, err => {
      console.log(err)
    });

  }


  submit() {
    console.log(this.transactionSummaryModel);

    debugger;
    if (this.transactionSummaryModel) {
      this.services
        .sendTransactionSummary(this.transactionSummaryModel)
        .subscribe(response => {
          if (response && !isNaN(response.data)) {
            this.services.redirectToCmi(this.transactionSummary, this.user);
          } else {
            console.log(this.transactionSummaryModel);
          }
        });

    }

  }


  getBillsToPay() {
    // debugger;
    this.selectedBills = this.dataService.get('selectedBills');
    this.totalAmount = this.dataService.get('total');
  }

  getTotalAmount() {
    return this.selectedBills.invoices
      .map(invoice => invoice.balance)
      .reduce((a, b) => {
        return parseFloat(a) + parseFloat(b);
      });
  }

}

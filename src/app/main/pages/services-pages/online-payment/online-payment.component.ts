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
import {Router} from '@angular/router';

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
  totalAmount: string;
  showTotalAmount: string;

  constructor(private dataService: DataService, private services: ServicesService, private router: Router) {
  }

  ngOnInit() {

    if (localStorage.getItem(AuthHelper.USER_ID)) {
      this.user = JSON.parse(localStorage.getItem(AuthHelper.USER_ID));
    }

    const bool = this.getBillsToPay();
    if (!bool) {
      return;
    }
    console.log('jhvsqvhsq hvbsqvjqsvq vqvhqvdq');

    this.services.getTransactionSammury(parseFloat(this.totalAmount).toFixed(2)).subscribe(response => {

      this.transactionSummary = response.data;

      //this.transactionSummary.amount = parseFloat(this.transactionSummary.amount).toFixed(2);

      console.log(this.transactionSummary.amount);
            this.transactionSummaryModel = new TransactionSummaryModel(
        this.transactionSummary.oid,
        parseFloat(this.totalAmount).toFixed(2),
        this.selectedBills.invoices)

    }, err => {
      console.log(err)
    });

  }


  submit() {
    console.log(this.transactionSummaryModel);
    this.dataService.clear('selectedBills');

    if (this.transactionSummaryModel) {
      this.services
        .sendTransactionSummary(this.transactionSummaryModel)
        .subscribe(response => {
          if (response && !isNaN(response.data)) {
            this.services.redirectToCmi(this.transactionSummary, parseFloat(this.totalAmount).toFixed(2), this.user);
          } else {
            console.log(this.transactionSummaryModel);
          }
        });

    }

  }


  getBillsToPay(): boolean {
    this.selectedBills = this.dataService.get('selectedBills');
    if (!this.selectedBills) {
      this.router.navigate(['unpaid']);
      return false;
    }
    this.totalAmount = this.getTotalAmount();
    this.showTotalAmount = parseFloat(this.totalAmount).toFixed(2);
    return true;
  }

  getTotalAmount() {
    return this.selectedBills.invoices
      .map(invoice => invoice.balance)
      .reduce((a, b) => {
        return parseFloat(a) + parseFloat(b);
      });
  }

}

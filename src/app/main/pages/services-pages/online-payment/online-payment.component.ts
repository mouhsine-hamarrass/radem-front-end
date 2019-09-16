import {Component, OnInit} from '@angular/core';
import {DataService} from '../../../../shared/services/data.service';
import {AuthHelper} from '../../../../core/services/security/auth.helper';
import {User} from '../../../models/user.model';
import {ServicesService} from '../../../services/services.service';
import {LightTransactionSummary} from '../../../models/lightTransactionSummary';
import {TransactionSummaryModel} from '../../../models/transactionSummary.model';
import {Router} from '@angular/router';
import {PaymentHelperService} from '../../../services/payment-helper.service';

@Component({
  selector: 'app-online-payment',
  templateUrl: './online-payment.component.html',
  styleUrls: ['./online-payment.component.scss']
})
export class OnlinePaymentComponent implements OnInit {

  selectedBills;
  transactionSummary: LightTransactionSummary;
  transx;
  user: User;
  hash: string;
  transactionSummaryModel: TransactionSummaryModel;
  totalAmount: string;
  invoices: string[];
  showTotalAmount: string;

  constructor(
    private paymentHelperService: PaymentHelperService,
    private dataService: DataService,
    private services: ServicesService,
    private router: Router) {
  }

  ngOnInit() {

    if (localStorage.getItem(AuthHelper.USER_ID)) {
      this.user = JSON.parse(localStorage.getItem(AuthHelper.USER_ID));
    }

    const bool = this.getBillsToPay();
    if (!bool) {
      return;
    }
  }

  submit() {
    this.transactionSummaryModel = new TransactionSummaryModel(
      this.transactionSummary.oid,
      parseFloat(this.transactionSummary.amount).toFixed(2),
      this.selectedBills.invoices);
    this.services
      .sendTransactionSummary(this.transactionSummaryModel)
      .subscribe(response => {
        if (response && !isNaN(response.data)) {
          this.services.redirectToCmi(this.transactionSummary, parseFloat(this.transactionSummary.amount).toFixed(2), this.user);
        } else {
          console.log(this.transactionSummaryModel);
        }
      });
  }

  getBillsToPay(): boolean {
    this.selectedBills = this.paymentHelperService.getSelectedBills();
    this.transactionSummary = this.paymentHelperService.getTransactionSummary();

    if (!this.transactionSummary || !this.selectedBills) {
      this.router.navigate(['unpaid']);
      return false;
    }
    this.totalAmount = this.transactionSummary.amount;
    this.invoices = this.selectedBills.invoices.map(inv => inv.invoiceNo);
    this.showTotalAmount = parseFloat(this.transactionSummary.amount).toFixed(2).replace('.', ',');
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

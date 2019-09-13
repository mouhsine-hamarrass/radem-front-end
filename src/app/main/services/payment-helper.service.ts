import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {LightTransactionSummary} from '../models/lightTransactionSummary';


@Injectable()
export class PaymentHelperService {

  transactionSummary: LightTransactionSummary;

  selectedBills = {
    total: 0,
    invoices: []
  };

  constructor() {
  }

  setTransactionSummary(value: any) {
    this.transactionSummary = value;
  }

  getTransactionSummary() {
    return this.transactionSummary;
  }

  setSelectedBills(value: any) {
    this.selectedBills = value;
  }

  getSelectedBills() {
    return this.selectedBills;
  }

}


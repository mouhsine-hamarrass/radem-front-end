
export class InvoiceModel {

  id?: number;
  amount?: number;
  monthInvoice?: string;
  yearInvoice?: string;
  invoiceNo?: string;
  stamp?: string;


  constructor(
    amount: number,
    month: string,
    year: string,
    invoiceNo: string,
    stamp: string) {

    this.amount = amount;
    this.monthInvoice = month;
    this.yearInvoice = year;
    this.invoiceNo = invoiceNo;
    this.stamp = stamp;
  }
}

export class TransactionSummaryModel {
  id?: number;
  trxNumber?: string;
  totalAmount?: string;
  invoices?: Array<InvoiceModel>;


  constructor(
              trxNumber: string,
              totalAmount: string,
              invoices: Array<InvoiceModel> ) {

    this.trxNumber = trxNumber;
    this.totalAmount = totalAmount;
    this.invoices = invoices;
  }
}

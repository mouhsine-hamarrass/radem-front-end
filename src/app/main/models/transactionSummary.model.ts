
export class InvoiceModel {

  id?: number;
  amount?: number;
  monthInvoice?: string;
  yearInvoice?: string;
  invoiceNo?: string;


  constructor(
    amount: number,
    month: string,
    year: string,
    invoiceNo: string) {

    this.amount = amount;
    this.monthInvoice = month;
    this.yearInvoice = year;
    this.invoiceNo = invoiceNo;
  }
}

export class TransactionSummaryModel {
  id?: number;
  trxNumber?: string;
  totalAmount?: number;
  invoices?: Array<InvoiceModel>;


  constructor(
              trxNumber: string,
              totalAmount: number,
              invoices: Array<InvoiceModel> ) {

    this.trxNumber = trxNumber;
    this.totalAmount = totalAmount;
    this.invoices = invoices;
  }
}

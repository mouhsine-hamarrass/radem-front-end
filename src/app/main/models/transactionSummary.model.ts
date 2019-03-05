
class InvoiceModel {

  id?: number;
  amount?: number;
  monthInvoice?: string;
  yearInvoice?: string;
  invoiceNo?: string;
}

export class TransactionSummaryModel {
  id?: number;
  trxNumber?: string;
  totalAmount?: number;
  operartionDate?: Date;
  invoices?: Array<InvoiceModel>;


  constructor(id: number,
              trxNumber: string,
              totalAmount: number,
              operartionDate: Date,
              isRademResponse: boolean,
               invoices: Array<InvoiceModel> ) {

    this.id = id;
    this.trxNumber = trxNumber;
    this.totalAmount = totalAmount;
    this.operartionDate = operartionDate;
    this.invoices = invoices;
  }
}

export class InvoiceModel {

  invType?: string;
  ctrNo?: string;
  year?: string;
  month?: string;
  invNo?: string;
  amount?: string;
  invoicedVol?: string;
  invEmitDate?: string;
  invExigDate?: string;
  status?: string;
  fileId?: number;

  constructor(
    invType: string,
    ctrNo: string,
    year: string,
    month: string,
    invNo: string,
    amount: string,
    invoicedVol: string,
    invEmitDate: string,
    invExigDate: string,
    status: string,
    fileId: number
  ) {
    this.invType = invType;
    this.ctrNo = ctrNo;
    this.year = year;
    this.month = month;
    this.invNo = invNo;
    this.amount = amount;
    this.invoicedVol = invoicedVol;
    this.invEmitDate = invEmitDate;
    this.invExigDate = invExigDate;
    this.status = status;
    this.fileId = fileId;
  }
}

export class InvoicesToPayModel {

  total?: string;
  invoicesNumbers?: string[];

  constructor(
    amount: string,
    invoices: string[]) {

    this.total = amount;
    this.invoicesNumbers = invoices;
  }
}


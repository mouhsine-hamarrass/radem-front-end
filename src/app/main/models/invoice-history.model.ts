export class InvoiceHistoryModel {

  caliber?: string;
  index?: string;
  counterNo?: string;
  product?: string;
  invoicedVolume?: string;
  consumedVolume?: string;


  constructor(
    caliber,
    index,
    counterNo,
    product,
    invoicedVolume,
    consumedVolume
  ) {
    this.caliber = caliber;
    this.index = index;
    this.counterNo = counterNo;
    this.product = product;
    this.invoicedVolume = invoicedVolume;
    this.consumedVolume = consumedVolume;
  }
}

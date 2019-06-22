export class InvoiceDetailsModel {

  id?: string;
  orderDetails?: string;
  ctrNo?: string;
  category?: string;
  tranche?: string;
  product?: string;
  royalties?: string;
  royaltiesType?: string;
  tva?: string;
  htAmountProx?: string;
  invEmitDate?: string;
  invExigDate?: string;
  htAmount?: string;
  tvaAmount?: string;
  ttcAmount?: string;
  quantity?: string;

  constructor(
    id: string,
    orderDetails: string,
    ctrNo: string,
    category: string,
    tranche: string,
    product: string,
    royalties: string,
    royaltiesType: string,
    tva: string,
    htAmountProx: string,
    invEmitDate: string,
    invExigDate: string,
    htAmount: string,
    tvaAmount: string,
    ttcAmount: string,
    quantity: string
  ) {
    this.id = id;
    this.orderDetails = orderDetails;
    this.ctrNo = ctrNo;
    this.category = category;
    this.tranche = tranche;
    this.product = product;
    this.royalties = royalties;
    this.royaltiesType = royaltiesType;
    this.tva = tva;
    this.htAmountProx = htAmountProx;
    this.invEmitDate = invEmitDate;
    this.invExigDate = invExigDate;
    this.htAmount = htAmount;
    this.tvaAmount = tvaAmount;
    this.ttcAmount = ttcAmount;
    this.quantity = quantity;
  }
}

export class NewRefundRequestModel {
  id?: number;
  procuration?: boolean;
  procuratorCin?: string;
  procuratorLastname?: string;
  procuratorFirstname?: string;
  paymentMode?: string;
  cellphone?: string;
  fixphone?: string;
  mail?: string;
  mailingAddress?: string;
  contractNbrs?: Array<string>;
  attachmentIds?: Array<number>;
  tour?: string;
}

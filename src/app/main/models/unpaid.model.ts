import {InvoiceInfosModel} from './invoice-infos.model';

export interface UnpaidModel {
  id?: number;
  contactNo?: string;
  addressConsumption?: string;
  typeNetwork?: string;
  invoices?: Array<InvoiceInfosModel>;
}

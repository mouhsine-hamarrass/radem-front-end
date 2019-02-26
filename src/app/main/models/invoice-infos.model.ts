export interface InvoiceInfosModel {
  id?: number;
  contractNo?: string;
  invoiceNo?: string;
  year?: number;
  month?: number;
  balance?: number;
  amount?: number;
  exigible?: boolean;
  checked?: boolean;
}

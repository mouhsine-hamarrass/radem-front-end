export interface InvoiceInfosModel {
  id?: number;
  invoiceNo?: string;
  year?: number;
  month?: number;
  balance?: number;
  amount?: number;
  exigible?: boolean;
  checked?: boolean;
}

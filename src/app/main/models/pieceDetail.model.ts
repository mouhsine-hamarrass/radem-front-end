export class PieceDetailModel {

    invoiceNo?: string;
    contractNo?: string;
    month?: string;
    year?: string;
    amount?: string;






    constructor(
        invoiceNo: string,
        contractNo: string,
        month: string,
        year: string,
        amount: string
    ) {
        this.invoiceNo = invoiceNo;
        this.contractNo = contractNo;
        this.month = month;
        this.year = year;
        this.amount = amount;
    }
}

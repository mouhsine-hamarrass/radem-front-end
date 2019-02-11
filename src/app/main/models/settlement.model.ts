export class SettlementModel {
    id?: number;
    invoiceNo?: string;
    month?: string;
    year?: string;
    amount?: string;
    paymentDate?: string;
    paymentMode?: string;
    typeNetwork?: string;

    constructor(id: number,
                invoiceNo: string,
                month: string,
                year: string,
                amount: string,
                paymentDate: string,
                paymentMode: string,
                typeNetwork: string,
    ) {
        this.id = id;
        this.invoiceNo = invoiceNo;
        this.month = month;
        this.year = year;
        this.amount = amount;
        this.paymentDate = paymentDate;
        this.paymentMode = paymentMode;
        this.typeNetwork = typeNetwork;
    }
}

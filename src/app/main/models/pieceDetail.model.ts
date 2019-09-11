export class PieceDetailModel {

    invoiceNo?: string;
    contractNo?: string;
    month?: string;
    year?: string;
    amount?: string;
    networkType?: string;
    holderName?: string;
    contractStatus?: string;
    addressConsumption?: string;


    constructor(
        invoiceNo: string,
        contractNo: string,
        month: string,
        year: string,
        amount: string,
        networkType: string,
        holderName: string,
        contractStatus: string,
        addressConsumption: string
    ) {
        this.invoiceNo = invoiceNo;
        this.contractNo = contractNo;
        this.month = month;
        this.year = year;
        this.amount = amount;
        this.networkType = networkType;
        this.holderName = holderName;
        this.contractStatus = contractStatus;
        this.addressConsumption = addressConsumption;
    }
}

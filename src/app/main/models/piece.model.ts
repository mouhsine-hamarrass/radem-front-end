export class PieceModel {

    paymentMode?: string;
    receiptNo?: string;
    receiptDate?: string;
    receiptEmiDate?: string;
    receiptType?: string;
    numberOfContracts?: string;
    totalAmount?: string;


    constructor(
        paymentMode: string,
        receiptNo: string,
        receiptDate: string,
        receiptEmiDate: string,
        receiptType: string,
        numberOfContracts: string,
        totalAmount: string
    ) {
        this.paymentMode = paymentMode;
        this.receiptNo = receiptNo;
        this.receiptDate = receiptDate;
        this.receiptEmiDate = receiptEmiDate;
        this.receiptType = receiptType;
        this.numberOfContracts = numberOfContracts;
        this.paymentMode = paymentMode;
        this.totalAmount = totalAmount;
    }
}

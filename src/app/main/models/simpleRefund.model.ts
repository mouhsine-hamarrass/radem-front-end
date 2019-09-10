import {List} from '../../core/helpers/data-structure';
import {StatusModel} from './status.model';

export class SimpleRefundModel {

    id?: number;
    requestNo?: string;
    contractNbrs?: List<string>;
    mailingAddress?: string;
    cin?: string;
    createdAt?: string;
    amount?: string;
    modePayment?: string;
    status?: StatusModel;


    constructor(
        id?: number,
        requestNo?: string,
        contractNbrs?: List<string>,
        mailingAddress?: string,
        cin?: string,
        createdAt?: string,
        amount?: string,
        modePayment?: string,
        status?: StatusModel
    ) {
        this.id = id;
        this.requestNo = requestNo;
        this.contractNbrs = contractNbrs;
        this.mailingAddress = mailingAddress;
        this.cin = cin;
        this.createdAt = createdAt;
        this.amount = amount;
        this.modePayment = modePayment;
        this.status = status;
    }
}

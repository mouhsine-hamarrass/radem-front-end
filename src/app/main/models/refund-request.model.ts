import {StatusModel} from './status.model';
import {FeedbackModel} from './feedback.model';
import {RequestSubscriptionTypeEnum} from '../../shared/models/user.model';
import {ViewChild} from '@angular/core';
import {WizardComponent} from 'angular-archwizard';

export class RefundRequestModel {
    id?: number;
    contracts?: Array<string>;
    createdAt?: string;
    modifiedAt?: string;
    description?: string;
    feedbacks?: Array<FeedbackModel>;
    requestNo?: string;
    phone?: string;
    fixPhone?: string;
    mail?: string;
    mailingAddress?: string;
    procuration?: boolean;
    procuratorCin?: string;
    procuratorLastname?: string;
    procuratorFirstname?: string;
    requestPaymentMode?: string;
    subscriptionType?: RequestSubscriptionTypeEnum;
    networkType?: string;
    status?: StatusModel;
    @ViewChild(WizardComponent)
    public wizard: WizardComponent;

    constructor(id: number,
                requestNo: string,
                createdAt: string,
                modifiedAt: string,
                subscriptionType: RequestSubscriptionTypeEnum,
                contracts: Array<string>,
                feedbacks: Array<FeedbackModel>,
                phone: string,
                fixPhone: string,
                mail: string,
                mailingAddress: string,
                procuration: boolean,
                procuratorCin: string,
                procuratorLastname: string,
                procuratorFirstname: string,
                requestPaymentMode: string,
                networkType: string,
                description: string,
                status: StatusModel
    ) {

        this
            .id = id;
        this
            .requestNo = requestNo;
        this
            .createdAt = createdAt;
        this
            .modifiedAt = modifiedAt;
        this
            .subscriptionType = subscriptionType;
        this
            .contracts = contracts;
        this
            .feedbacks = feedbacks;
        this
            .networkType = networkType;
        this
            .status = status;
        this
            .phone = phone;
        this
            .fixPhone = fixPhone;
        this
            .mail = mail;
        this
            .mailingAddress = mailingAddress;
        this
            .procuration = procuration;
        this
            .procuratorCin = procuratorCin;
        this
            .procuratorLastname = procuratorLastname;
        this
            .procuratorFirstname = procuratorFirstname;
        this
            .requestPaymentMode = requestPaymentMode;
        this
            .description = description;
    }
}

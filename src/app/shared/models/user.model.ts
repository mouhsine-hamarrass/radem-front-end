import {User} from '../../core/models/user.model';

export class UserDetails extends User {

    constructor(id: number,
                username: string,
                password: string,
                firstname: string,
                lastname: string,
                email: string) {
        super(id,
            username,
            password,
            firstname,
            lastname,
            email
        );
    }
}

export enum UserProfile {
    ADMINISTRATION = 'admin',
    ADMINISTRATION_PRINCIPALE = 'Administrateur principal',
}

export enum UserAccountType {
    ADMINISTRATION = 'ADMINISTRATION',
    ADMINISTRATION_PRINCIPALE = 'ADMINISTRATION_PRINCIPALE'
}

export enum Statut {

    CREATED = 'CREATED',
    RECEIVED = 'RECEIVED',
    IN_PROGRESS = 'IN_PROGRESS',
    DEPOSITED_COUNTER = 'DEPOSITED_COUNTER',
    UNPAID_VERIFICATION = 'UNPAID_VERIFICATION',
    SETTLEMENT = 'SETTLEMENT',

    REFUND = 'REFUND',
    CLOSED = 'CLOSED',

    FILING_APPLICATION = 'FILING_APPLICATION',
    INTERVENTION = 'INTERVENTION',
    METER_POSES = 'METER_POSES',
    SUBSCRIPTION_INVOICE = 'SUBSCRIPTION_INVOICE',
    SUBSCRIBED = 'SUBSCRIBED'
}

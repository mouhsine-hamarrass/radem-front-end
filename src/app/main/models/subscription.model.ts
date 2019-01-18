export class SubscriptionModel {
    id?: number;
    subscription?: string;
    tournee?: string;
    type?: string;

    createdAt?: string;
    requestNumber?: string;
    status?: string;
    feedback?: any;
    subscriptions?: any;
    intervenant?: any;
    interventionDate?: string;
    agent?: any;

    constructor(id: number,
                subscription: string,
                tournee: string,
                type: string,

                createdAt: string,
                requestNumber: string,
                status: string,
                feedback: any,
                subscriptions: any,
                intervenant: any,
                interventionDate: string,
                agent: string) {

        this.id = id;
        this.subscription = subscription;
        this.tournee = tournee;
        this.type = type;

        this.createdAt = type;
        this.requestNumber = type;
        this.status = type;
        this.feedback = feedback;
        this.subscriptions = subscriptions;
        this.intervenant = intervenant;
        this.interventionDate = interventionDate;
        this.agent = agent;
    }
}

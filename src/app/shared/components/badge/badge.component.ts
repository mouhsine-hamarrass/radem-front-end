import {Component, Input, OnInit} from '@angular/core';
import {ComplaintStatus, SubscriptionRequestStatus, TerminationRequestStatus, AlertNotificationStatus} from '../../models/user.model';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-badge',
    templateUrl: './badge.component.html',
    styleUrls: ['./badge.component.scss']
})
export class BadgeComponent implements OnInit {
    @Input() status: string;
    @Input() className: string;

    constructor(private translate: TranslateService) {
    }

    ngOnInit() {
    }

    colorByType(status: string): string {
        let badge = '';
        if (status === ComplaintStatus.ANALYSIS || status === ComplaintStatus.CREATED ||
            status === SubscriptionRequestStatus.SUBSCRIBED || status === SubscriptionRequestStatus.INTERVENTION ||
            status === TerminationRequestStatus.CREATED) {
            badge = 'badge-secondary';
        } else if (status === ComplaintStatus.REPLY_PROVIDED || status === ComplaintStatus.SUPPORTED ||
            status === TerminationRequestStatus.RECEIVED || status === TerminationRequestStatus.UNPAID_VERIFICATION
        ) {
            badge = 'badge-info';
        } else if (status === ComplaintStatus.REPLY_PROVIDED ||
            status === SubscriptionRequestStatus.FILING_APPLICATION ||
            status === TerminationRequestStatus.IN_PROGRESS || status === TerminationRequestStatus.REFUND) {
            badge = 'badge-success';
        } else if (status === ComplaintStatus.CLOSED || status === ComplaintStatus.TRANSMISSION_OF_INFORMATION ||
            status === SubscriptionRequestStatus.METER_POSES ||
            status === TerminationRequestStatus.CLOSED) {
            badge = 'badge-danger';
        } else {
            badge = 'badge-primary';
        }
        return badge;
    }
}

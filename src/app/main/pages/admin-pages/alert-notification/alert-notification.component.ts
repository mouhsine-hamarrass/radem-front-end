import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AdminService} from '../../../services/admin.service';
import {AlertModel} from '../../../models/alert.model';
import {AlertNotificationModel} from '../../../models/alert-notification.model';
import {ClientModel} from '../../../models/client.model';
import {ContactModel} from '../../../models/contact.model';
import {SubscriptionModel} from '../../../models/subscription.model';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-alert-notification',
    templateUrl: './alert-notification.component.html',
    styleUrls: ['./alert-notification.component.scss']
})
export class AlertNotificationComponent implements OnInit {

    alertForm: FormGroup;
    alerts: Array<AlertModel>;
    alert: AlertModel;
    contracts: any;
    user: any;
    alertNotification: AlertNotificationModel;

    constructor(private adminService: AdminService,
                private formBuilder: FormBuilder,
                private activeRoute: ActivatedRoute,
                private router: Router,
                private translate: TranslateService,
                private toastrService: ToastrService) {
        this.alertForm = this.formBuilder.group({
            type: ['', Validators.required],
            description: ['', Validators.required],
            contract: ['', Validators.required],
            client: ['']
        })
    }

    get type() {
        return this.alertForm.get('type');
    }

    get description() {
        return this.alertForm.get('description');
    }

    get contract() {
        return this.alertForm.get('contract');
    }

    get client() {
        return this.alertForm.get('client');
    }

    ngOnInit() {
        const id: string = this.activeRoute.snapshot.paramMap.get('id');
        if (id !== null) {
            this.adminService.getAlertNotificationById(id).subscribe(response => {
                this.alertNotification = response.data;
            });
        }
        this.adminService.getAlerts().subscribe(response => {
            this.alerts = response.data;
        });

        this.adminService.getUsers().subscribe(response => {
            this.contracts = response;
        })
    }

    setAlert(id: any) {
        this.adminService.getAlert(id).subscribe(response => {
            this.alert = response.data;
            this.alertForm.controls.description.setValue(this.alert.instructions);
        })
    }

    setClient(contractNumber: any) {
        this.adminService.getUserWithContract(contractNumber).subscribe(response => {
            this.user = response;
            this.alertForm.controls.client.setValue(this.user[0].fullName);
        })
    }

    saveNotificationAlert() {
        this.alertNotification = new AlertNotificationModel(
            null,
            new ClientModel(this.user[0].id, this.user[0].fullName, new ContactModel(1, null, null, null, null)),
            this.description.value,
            null, // new SubscriptionModel(null, this.user[0].contract, 'tournee', 'eau'),
            new AlertModel(this.alert.id, null, null)
        );
        this.adminService.saveAlertNotification(this.alertNotification).subscribe(response => {
            this.alertNotification = response.data;
            this.toastrService.success(this.translate.instant('SUCCESS_OPERATION'), '');
            this.router.navigate(['/admin/alert-notifications']);
        }, err => {

        });
    }
}

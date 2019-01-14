import {Component, OnInit, TemplateRef} from '@angular/core';
import {AdminService} from '../../../services/admin.service';
import {ToastrService} from 'ngx-toastr';
import swal from 'sweetalert2';
import {BsModalRef, ModalOptions} from 'ngx-bootstrap';
import {BsModalService} from 'ngx-bootstrap/modal';
import {AlertModel} from '../../../models/alert.model';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-alerts',
    templateUrl: './alerts.component.html',
    styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {

    alerts: any = Array<AlertModel>();
    page = 1;
    pageSize = 0;
    totalElements: number;
    totalPages: number;
    numberOfItems: number;
    itemsPerPage: number;
    sort: any;
    filter: any;

    alertId: number;

    modalRef: BsModalRef;
    private translate: TranslateService;

    private modalOptions = <ModalOptions>{backdrop: true, ignoreBackdropClick: false, class: 'modal-md'};

    constructor(private adminService: AdminService,
                private toastrService: ToastrService,
                private modalService: BsModalService) {
    }

    ngOnInit() {
        this.getAlerts();
    }

    onSorted(sort: any): void {
        this.sort = sort;
        this.getAlerts();
    }

    onFiltred(filter: any): void {
        this.filter = filter;
        this.getAlerts();
    }

    getAlerts() {
        this.adminService.getPageableAlerts(this.page, this.pageSize, this.filter, this.sort)
            .subscribe(response => {
                this.alerts = response.data.content;
                this.totalElements = response.data.totalElements;
                this.totalPages = response.data.totalPages;
                this.itemsPerPage = response.data.size;
                this.numberOfItems = response.data.numberOfElements;
            }, err => {
            });
    }

    pageChanged(page: number): void {
        this.page = page;
        this.getAlerts();
    }

    pageFilter(pageSize: number): void {
        this.pageSize = pageSize;
        this.itemsPerPage = pageSize;
        this.page = 1;
        this.getAlerts();
    }

    dropAlert(alertId: number) {
        swal({
            title: this.translate.instant('ARE_YOU_SURE'),
            text: this.translate.instant('THIS_ACTION_IS_IRREVERSIBLE'),
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dd3333',
            cancelButtonColor: '#3085d6',
            cancelButtonText: this.translate.instant('CANCEL'),
            confirmButtonText: this.translate.instant('YES_DELETE')
        }).then((result) => {
            if (result.value) {
                this.adminService.dropAlert(alertId).subscribe(response => {
                    this.alerts.splice(this.alerts.indexOf(this.alerts.find(alert => alert.id === alertId)), 1);
                    this.toastrService.success(this.translate.instant('THE_ALERT_HAS_BEEN_REMOVED'), this.translate.instant('DELETE_!'));
                }, err => {
                    this.toastrService.error(this.translate.instant('THE_ALERT_CAN_NOT_BE_DELETED'), this.translate.instant('THE_ALERT_IS_ALREADY_IN_USE'));
                });
            }
        });
    }

    showAlertForm(template: TemplateRef<any>, alertId: number) {
        this.alertId = alertId;

        this.modalRef = this.modalService.show(template, this.modalOptions);
    }

    refreshAlerts(doRefresh: boolean) {
        if (doRefresh) {
            this.getAlerts();
        }
    }
}
